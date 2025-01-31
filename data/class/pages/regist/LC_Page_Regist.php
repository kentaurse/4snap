<?php
/*
 * Copyright(c) 2000-2007 LOCKON CO.,LTD. All Rights Reserved.
 *
 * http://www.lockon.co.jp/
 */

// {{{ requires
require_once(CLASS_PATH . "pages/LC_Page.php");

/**
 * 会員登録のページクラス.
 *
 * @package Page
 * @author LOCKON CO.,LTD.
 * @version $Id$
 */
class LC_Page_Regist extends LC_Page {

    // {{{ properties

    /** ページ情報の配列 */
    var $arrInfo;

    /** 設定情報 */
    var $CONF;

    // }}}
    // {{{ functions

    /**
     * Page を初期化する.
     *
     * @return void
     */
    function init() {
        parent::init();
        $this->tpl_css = URL_DIR.'css/layout/regist/index.css';
    }

    /**
     * Page のプロセス.
     *
     * @return void
     */
    function process() {
        $objConn = new SC_DBConn();
        $objQuery = new SC_Query();
        $objView = new SC_SiteView();
        $objSiteInfo = $objView->objSiteInfo;
        $objCustomer = new SC_Customer();
        $this->CONF = SC_Utils_Ex::sf_getBasisData();
        $this->arrInfo = $objSiteInfo->data;

        // キャンペーンからの登録の場合の処理
        if($_GET["cp"] != "") {
            $etc_val = array("cp" => $_GET['cp']);
        }

        //--　本登録完了のためにメールから接続した場合
        if ($_GET["mode"] == "regist") {

            //-- 入力チェック
            $this->arrErr = lfErrorCheck($_GET);
            if ($this->arrErr) {
                $this->tpl_mainpage = 'regist/error.tpl';
                $this->tpl_css = "/css/layout/regist/error.css";
                $this->tpl_title = 'エラー';

            } else {
                //$this->tpl_mainpage = 'regist/complete.tpl';
                //$this->tpl_title = ' 会員登録(完了ページ)';
                $registSecretKey = $this->lfRegistData($_GET);			//本会員登録（フラグ変更）
                $this->lfSendRegistMail($registSecretKey);				//本会員登録完了メール送信

                // ログイン済みの状態にする。
                $email = $objQuery->get("dtb_customer", "email", "secret_key = ?", array($registSecretKey));
                $objCustomer->setLogin($email);
                $this->sendRedirect($this->getLocation("./complate.php", $etc_val));
                exit;
            }

        //--　それ以外のアクセスは無効とする
        } else {
            $this->arrErr["id"] = "無効なアクセスです。";
            $this->tpl_mainpage = 'regist/error.tpl';
            $this->tpl_css = "/css/layout/regist/error.css";
            $this->tpl_title = 'エラー';

        }

        //----　ページ表示
        $objView->assignobj($this);
        $objView->display(SITE_FRAME);
    }

    /**
     * デストラクタ.
     *
     * @return void
     */
    function destroy() {
        parent::destroy();
    }

    //---- 登録
    function lfRegistData($array) {
        $objQuery = new SC_Query();
        $objConn = new SC_DBConn();
        $this->arrInfo;

        do {
            $secret = SC_Utils_Ex::sfGetUniqRandomId("r");
        } while( ($result = $objConn->getOne("SELECT COUNT(*) FROM dtb_customer WHERE secret_key = ?", array($secret)) ) != 0);

        $sql = "SELECT email FROM dtb_customer WHERE secret_key = ? AND status = 1";
        $email = $objConn->getOne($sql, array($array["id"]));

        $objConn->query("BEGIN");
        $arrRegist["secret_key"] = $secret;	//　本登録ID発行
        $arrRegist["status"] = 2;
        $arrRegist["update_date"] = "NOW()";

        $objQuery = new SC_Query();
        $where = "secret_key = ? AND status = 1";

        $arrRet = $objQuery->select("point", "dtb_customer", $where, array($array["id"]));
        // 会員登録時の加算ポイント(購入時会員登録の場合は、ポイント加算）
        $arrRegist['point'] = $arrRet[0]['point'] + addslashes($arrInfo['welcome_point']);

        $objQuery->update("dtb_customer", $arrRegist, $where, array($array["id"]));

        /* 購入時の自動会員登録は行わないためDEL
        // 購入時登録の場合、その回の購入を会員購入とみなす。
        // 会員情報の読み込み
        $where1 = "secret_key = ? AND status = 2";
        $customer = $objQuery->select("*", "dtb_customer", $where1, array($secret));
        // 初回購入情報の読み込み
        $order_temp_id = $objQuery->get("dtb_order_temp", "order_temp_id");
        // 購入情報の更新
        if ($order_temp_id != null) {
            $arrCustomer['customer_id'] = $customer[0]['customer_id'];
            $where3 = "order_temp_id = ?";
            $objQuery->update("dtb_order_temp", $arrCustomer, $where3, array($order_temp_id));
            $objQuery->update("dtb_order", $arrCustomer, $where3, array($order_temp_id));
        }
        */

        $sql = "SELECT mailmaga_flg FROM dtb_customer WHERE email = ?";
        $result = $objConn->getOne($sql, array($email));

        switch($result) {
        // 仮HTML
        case '4':
            $arrRegistMail["mailmaga_flg"] = 1;
            break;
        // 仮TEXT
        case '5':
            $arrRegistMail["mailmaga_flg"] = 2;
            break;
        // 仮なし
        case '6':
            $arrRegistMail["mailmaga_flg"] = 3;
            break;
        default:
            $arrRegistMail["mailmaga_flg"] = $result;
            break;
        }

        $objQuery->update("dtb_customer", $arrRegistMail, "email = '" .addslashes($email). "' AND del_flg = 0");
        $objConn->query("COMMIT");

        return $secret;		// 本登録IDを返す
    }

    //---- 入力エラーチェック
    function lfErrorCheck($array) {

        $objConn = new SC_DbConn();
        $objErr = new SC_CheckError($array);

        $objErr->doFunc(array("仮登録ID", 'id'), array("EXIST_CHECK"));
        if (! EregI("^[[:alnum:]]+$",$array["id"] )) {
            $objErr->arrErr["id"] = "無効なURLです。メールに記載されている本会員登録用URLを再度ご確認ください。";
        }
        if (! $objErr->arrErr["id"]) {

            $sql = "SELECT customer_id FROM dtb_customer WHERE secret_key = ? AND status = 1 AND del_flg = 0";
            $result = $objConn->getOne($sql, array($array["id"]));

            if (! is_numeric($result)) {
                $objErr->arrErr["id"] .= "※ 既に会員登録が完了しているか、無効なURLです。<br>";
                return $objErr->arrErr;

            }
        }

        return $objErr->arrErr;
    }

    //---- 正会員登録完了メール送信
    function lfSendRegistMail($registSecretKey) {
        $objConn = new SC_DbConn();
        global $CONF;

        //-- 姓名を取得
        $sql = "SELECT email, name01, name02 FROM dtb_customer WHERE secret_key = ?";
        $result = $objConn->getAll($sql, array($registSecretKey));
        $data = $result[0];

        //--　メール送信
        $objMailText = new SC_SiteView();
        $objMailText->assign("CONF", $CONF);
        $objMailText->assign("name01", $data["name01"]);
        $objMailText->assign("name02", $data["name02"]);
        $toCustomerMail = $objMailText->fetch("mail_templates/customer_regist_mail.tpl");
        $subject = sfMakeSubject('会員登録が完了しました。');
        $objMail = new GC_SendMail();

        $objMail->setItem(
                              ''								//　宛先
                            , $subject//"【" .$CONF["shop_name"]. "】".ENTRY_CUSTOMER_REGIST_SUBJECT 		//　サブジェクト
                            , $toCustomerMail					//　本文
                            , $CONF["email03"]					//　配送元アドレス
                            , $CONF["shop_name"]				//　配送元　名前
                            , $CONF["email03"]					//　reply_to
                            , $CONF["email04"]					//　return_path
                            , $CONF["email04"]					//  Errors_to
                        );
        // 宛先の設定
        $name = $data["name01"] . $data["name02"] ." 様";
        $objMail->setTo($data["email"], $name);
        $objMail->sendMail();
    }
}
?>
