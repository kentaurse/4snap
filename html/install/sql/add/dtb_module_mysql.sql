CREATE TABLE dtb_module (
    module_id int NOT NULL UNIQUE,
    module_name text NOT NULL,
    now_version text,
    latest_version text NOT NULL,
    module_explain text,
    main_php text NOT NULL,
    extern_php text NOT NULL,
    install_sql text,
    uninstall_sql text,
    other_files text,
    del_flg smallint NOT NULL DEFAULT 0,
    create_date datetime NOT NULL ,
    update_date datetime,
    release_date datetime NOT NULL,
    sub_data text,
    module_x int,
    module_y int,
    eccube_version text
) TYPE=InnoDB;
