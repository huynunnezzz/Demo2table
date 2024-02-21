const usersModel = require('../models/user');

const getLogin = (req, res) => {
    res.render("admin/login", { data: {} });
}
const postLogin = async (req, res) => {
    const { email, password } = req.body;
    let error = null;
    const users = await usersModel.find({
        email: email,
        password: password
    })
    if (email == "" || password == "") {
        error = "Yêu cầu nhập đầy đủ thông tin!"
    }
    else if (users.length > 0) {
        req.session.email = email;
        req.session.password = password;
        res.redirect("/admin/dashboard");
    } else {
        error = "Tài khoản không hợp lệ";
    }
    res.render("admin/login", { data: { error } });
}


const getRegester = (req, res) => {
    res.render("admin/regester", { data: {} });
}

const postRegester = async (req, res) => {
    checkadd = false;
    const { email, password, repassword, role, full_name } = req.body;
    const checkemail = await usersModel.find({
        email:email
    })
    let error = null;
    let success = null;
    if (email == "" || password == "" || role == "" || full_name == "") {
        error = "Yêu cầu nhập đầy đủ thông tin!";
    }
    else if(checkemail.length > 0) {
        error = "Email đã được đăng ký";
    }
    else if(password != repassword){
        error = "Mật khẩu không trùng khớp";
    }
    else{
        const data = new usersModel({
            email: email,
            password: password,
            role: role,
            full_name: full_name
        }).save();
        checkadd = true;
        success = "Đăng ký thành công";
    }
    res.render("admin/regester", { data: { error, success,checkadd}});
}

const getLogout = (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
}

module.exports = {
    getLogin,
    postLogin,
    getRegester,
    postRegester,
    getLogout
}