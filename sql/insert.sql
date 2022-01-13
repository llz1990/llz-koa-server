-- users表插入
insert into
    users (userId, name, password, avatar, roles, moment)
values
    (
        '100001',
        'jack',
        '123456',
        'https://wx.qlogo.cn/mmopen/vi_32/un2HbJJc6eiaviaibvMgiasFNlVDlNOb9E6WCpCrsO4wMMhHIbsvTkAbIehLwROVFlu8dLMcg00t3ZtOcgCCdcxlZA/132',
        'admin',
        ''
    );

-- pic_list表插入
insert into
    pic_list (listId, listName, backUrl, descInfo)
values
    (
        'list01',
        '我的相册',
        'https://wx.qlogo.cn/mmopen/vi_32/un2HbJJc6eiaviaibvMgiasFNlVDlNOb9E6WCpCrsO4wMMhHIbsvTkAbIehLwROVFlu8dLMcg00t3ZtOcgCCdcxlZA/132',
        ''
    );

-- pic_list表插入
insert into
    pic_detail (picId, listId, picUrl)
values
    (
        'pic001',
        'list1641138815026',
        'https://wx.qlogo.cn/mmopen/vi_32/un2HbJJc6eiaviaibvMgiasFNlVDlNOb9E6WCpCrsO4wMMhHIbsvTkAbIehLwROVFlu8dLMcg00t3ZtOcgCCdcxlZA/132'
    );