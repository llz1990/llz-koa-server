-- users表插入
insert into
    users (userId, name, password, avatar, roles, moment)
values
    (
        '100001',
        'jack',
        '123456',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Ffa%2Fae%2F5f%2Ffaae5fe743248d37ef44201105100649.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644890378&t=4bf9556cd64895a40643d3a9e440e80e',
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

-- pic_detail插入
insert into
    pic_detail (picId, listId, picUrl)
values
    (
        'pic001',
        'list1641138815026',
        'https://wx.qlogo.cn/mmopen/vi_32/un2HbJJc6eiaviaibvMgiasFNlVDlNOb9E6WCpCrsO4wMMhHIbsvTkAbIehLwROVFlu8dLMcg00t3ZtOcgCCdcxlZA/132'
    );

-- video_list表插入 
insert into
    video_list (
        videoId,
        videoTitle,
        videoImg,
        videoUrl,
        videoCreator,
        creatorAvatar
    )
values
    (
        'video002',
        '老鼠外出觅食，简直是酷毙了的视频，哈哈哈哈哈哈哈哈~',
        '',
        '/videos/002.mp4',
        'Kobe Bryant',
        'https://wx.qlogo.cn/mmopen/vi_32/un2HbJJc6eiaviaibvMgiasFNlVDlNOb9E6WCpCrsO4wMMhHIbsvTkAbIehLwROVFlu8dLMcg00t3ZtOcgCCdcxlZA/132'
    );