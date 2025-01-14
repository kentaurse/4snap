<!--{*
 * Copyright(c) 2000-2007 LOCKON CO.,LTD. All Rights Reserved.
 *
 * http://www.lockon.co.jp/
 *}-->
<!--▼CONTENTS-->
<table width="760" border="0" cellspacing="0" cellpadding="0" summary=" ">
	<tr>
		<td align="center" bgcolor="#ffffff">
		
		<!--購入手続きの流れ-->
		<table width="700" border="0" cellspacing="0" cellpadding="0" summary=" ">
			<tr><td height="15"></td></tr>
			<tr>
				<td><img src="<!--{$TPL_DIR}-->img/shopping/flow01.gif" width="700" height="36" alt="購入手続きの流れ"></td>
			</tr>
			<tr><td height="15"></td></tr>
		</table>
		<!--購入手続きの流れ-->

		<!--▼MAIN ONTENTS-->
		<table width="700" border="0" cellspacing="0" cellpadding="0" summary=" ">
		<form name="form1" id="form1" method="post" action="<!--{$smarty.server.PHP_SELF|escape}-->">
		<input type="hidden" name="mode" value="customer_addr">
		<input type="hidden" name="uniqid" value="<!--{$tpl_uniqid}-->">
		<input type="hidden" name="other_deliv_id" value="">
			<tr>
				<td><img src="<!--{$TPL_DIR}-->img/shopping/deliv_title.jpg" width="700" height="40" alt="お届け先の指定"></td>
			</tr>
			<tr><td height="15"></td></tr>
			<tr>
				<td class="fs12">下記一覧よりお届け先住所を選択して、「選択したお届け先に送る」ボタンをクリックしてください。
				一覧にご希望の住所が無い場合は、「新しいお届け先を追加する」より追加登録してください。<br>
				※最大20件まで登録できます。</td>
			</tr>
			<tr><td height="15"></td></tr>
			<!--{if $tpl_addrmax < $smarty.const.DELIV_ADDR_MAX}-->
			<tr>
				<td>
					<a href="<!--{$smarty.const.URL_DIR}-->mypage/delivery_addr.php" onclick="win02('<!--{$smarty.const.URL_DIR}-->mypage/delivery_addr.php?page=<!--{$smarty.server.PHP_SELF|escape}-->','new_deiv','600','640'); return false;" onmouseover="chgImg('<!--{$TPL_DIR}-->img/common/newadress_on.gif','addition');" onmouseout="chgImg('<!--{$TPL_DIR}-->img/common/newadress.gif','addition');"><img src="<!--{$TPL_DIR}-->img/common/newadress.gif" width="160" height="22" alt="新しいお届け先を追加する" name="addition" id="addition" /></a>
				</td>
			</tr>
			<tr><td height="20"></td></tr>
			<!--{/if}-->
			<tr>
				<td bgcolor="#cccccc">
				<!--表示エリアここから-->
				<!--{if $arrErr.deli != ""}-->
				<table width="700" border="0" cellspacing="2" cellpadding="10" summary=" " bgcolor="#ff7e56">
					<tr>
						<td align="center" class="fs14" bgcolor="#ffffff">
							<span class="red"><strong><!--{$arrErr.deli}--></strong></span>
						</td>
					</tr>
				</table>
				</td></tr><tr><td height=15></td></tr><tr><td bgcolor="#cccccc">
				<!--{/if}-->
				
				<table width="700" border="0" cellspacing="1" cellpadding="10" summary=" ">
					<tr align="center" bgcolor="#f0f0f0">
						<td width="40" class="fs12">選択</td>
						<td width="100" class="fs12">住所種類</td>
						<td width="374" class="fs12">お届け先</td>
						<td width="40" class="fs12">変更</td>
						<td width="40" class="fs12">削除</td>
					</tr>

					<!--{section name=cnt loop=$arrAddr}-->		
						<tr class="fs12" bgcolor="#ffffff">
							<td align="center">
								<!--{if $smarty.section.cnt.first}-->
								<input type="radio" name="deliv_check" id="chk_id_<!--{$smarty.section.cnt.iteration}-->" value="-1" <!--{if $arrForm.deliv_check.value == "" || $arrForm.deliv_check.value == -1}-->checked<!--{/if}-->>
								<!--{else}-->
								<input type="radio" name="deliv_check" id="chk_id_<!--{$smarty.section.cnt.iteration}-->" value="<!--{$arrAddr[cnt].other_deliv_id}-->" <!--{if $arrForm.deliv_check.value == $arrAddr[cnt].other_deliv_id}-->checked<!--{/if}-->>
								<!--{/if}-->
							</td>
							<td>
								<label for="chk_id_<!--{$smarty.section.cnt.iteration}-->"><!--{if $smarty.section.cnt.first}-->会員登録住所<!--{else}-->追加登録住所<!--{/if}--></label>
							</td>
							<td>
								<!--{assign var=key value=$arrAddr[cnt].pref}--><!--{$arrPref[$key]}--><!--{$arrAddr[cnt].addr01|escape}--><!--{$arrAddr[cnt].addr02|escape}--><br/>
								<!--{$arrAddr[cnt].name01|escape}--> <!--{$arrAddr[cnt].name02|escape}-->
							</td>
							<td align="center">
								<!--{if !$smarty.section.cnt.first}--><a href="<!--{$smarty.const.URL_DIR}-->mypage/delivery_addr.php" onclick="win02('/mypage/delivery_addr.php?page=<!--{$smarty.server.PHP_SELF|escape}-->&other_deliv_id=<!--{$arrAddr[cnt].other_deliv_id}-->','new_deiv','600','640'); return false;">変更</a><!--{/if}-->
							</td>
							<td align="center">
								<!--{if !$smarty.section.cnt.first}--><a href="<!--{$smarty.server.PHP_SELF|escape}-->" onclick="fnModeSubmit('delete', 'other_deliv_id', '<!--{$arrAddr[cnt].other_deliv_id}-->'); return false">削除</a><!--{/if}-->
							</td>
						</tr>
					<!--{/section}-->

				</table>
				<!--表示エリアここまで-->
				</td>
			</tr>
			<tr><td height="25"></td></tr>
			<tr align="center">
				<td>
					<a href="<!--{$smarty.const.URL_DIR}-->cart/index.php" onmouseover="chgImgImageSubmit('<!--{$TPL_DIR}-->img/common/b_back_on.gif',back03)" onmouseout="chgImgImageSubmit('<!--{$TPL_DIR}-->img/common/b_back.gif',back03)"><img src="<!--{$TPL_DIR}-->img/common/b_back.gif" width="150" height="30" alt="戻る" border="0" name="back03" id="back03"/></a>
					<img src="<!--{$TPL_DIR}-->img/_.gif" width="12" height="" alt="" /><input type="image" onmouseover="chgImgImageSubmit('<!--{$TPL_DIR}-->img/shopping/b_select_on.gif',this)" onmouseout="chgImgImageSubmit('<!--{$TPL_DIR}-->img/shopping/b_select.gif',this)" src="<!--{$TPL_DIR}-->img/shopping/b_select.gif" width="190" height="30" alt="選択したお届け先に送る" border="0" name="send_button" id="send_button" />
				</td>
			</tr>
		</form>
		</table>
		<!--▲MAIN ONTENTS-->
		</td>
	</tr>
</table>
<!--▲CONTENTS-->
