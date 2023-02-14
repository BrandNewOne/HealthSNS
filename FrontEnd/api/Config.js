const BASE_URL = "http://localhost:3000";

export const API = {
    BASE_URL: `${BASE_URL}`,
    LOGIN:      `/authenticate`,
    SENDMAIL:   `/mail/authMail`,
    USERSAVE:   `/mail/sendMail`,
    AUTHMAIL:   `/users/save`,
    USERUPDATE: `/users/update`,
    USERINFO: `/users/info`,
    USERDELETE: `/users/delete`,
    LOGOUT:`/users/logout`,
    POSTSMAIN:  `/posts/main`,
    LIKEIT:  `/posts/likeIt`,
    POSTSSAVE:  `/posts/save`,
    POSTSLIKEIT:  `/posts/saveL`,
    POSTSDISLIKEIT:  `/posts/deleteL`,
    POSTSUPDATE:`/posts/update`,
    POSTSDELETE:`/posts/delete`,
    EATMAIN:    `/eat/main`,
    EATSAVE:    `/eat/save`,
    EATDELETE:    `/eat/delete`,
    MYFOOD:    `/food/myFood`,
    FOODDELETE:    `/food/delete`,
    REDIRECT:   `/reissue`,
    COMMENTSSAVE: `/comment/save`,
    COMMENTSMAIN: `/comment/posts`,
    COMMENTSDELETE: `/comment/delete`
};