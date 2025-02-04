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
    del_flg int2 NOT NULL DEFAULT 0,
    create_date timestamp NOT NULL,
    update_date timestamp,
    release_date timestamp NOT NULL,
    sub_data text,
    module_x int4,
    module_y int4,
    eccube_version text
);
