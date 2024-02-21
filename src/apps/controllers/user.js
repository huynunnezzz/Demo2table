const userModel = require('../models/user');
const pagnigation = require('../../common/pagnigation');

const getUser = async (req,res) =>{
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = page*limit - limit;
    const totalRow = await userModel.find().countDocuments();
    const totalPage = Math.ceil(totalRow/limit);
    const prev = page - 1;
    const hasPrev = (page>1) ? true : false;
    const next = page + 1;
    const hasNext = (page<totalPage) ? true : false;
    const users = await userModel
                        .find()
                        .limit(limit)
                        .skip(skip);
    res.render('admin/users/user',{
        users,
        pages:pagnigation(page,totalPage),
        next,
        hasNext,
        prev,
        hasPrev
    });
}

const getcreateUser = async (req,res) =>{
    res.render('admin/users/add_user',{ data: {} });
    
}
const postcreateUser = async (req,res) =>{
    checkadd = false;
    const { email, password, repassword, role, full_name } = req.body;
    const checkemail = await userModel.find({
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
        const data = new userModel({
            email: email,
            password: password,
            role: role,
            full_name: full_name
        }).save();
        checkadd = true;
        success = "Đăng ký thành công";
    }
    res.render("admin/users/add_user", { data: { error, success,checkadd}});
}


const geteditUSer = async (req,res) =>{
    const id = req.params.id;
    const user = await userModel.findById(id); 
    res.render('admin/users/edit_user',{user});
}

const posteditUSer = async (req,res) =>{
    const id = req.params.id;
    const {email,password,role,full_name} = req.body;
    const updateUser = {email,password,role,full_name};
    await userModel.findByIdAndUpdate(id,updateUser).exec();    
    res.redirect('/admin/users');
}

const delUser = async (req,res) =>{
    const id = req.params.id;
    await userModel.findByIdAndDelete({_id:id}).exec();
    res.redirect('/admin/users');
}

module.exports = {
    getUser,
    getcreateUser,
    postcreateUser,
    geteditUSer,
    posteditUSer,
    delUser
}