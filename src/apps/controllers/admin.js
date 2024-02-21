
const usersModel = require('../models/user');
const productModel = require('../models/product');

const dashboard = async (req,res)=>{
    const lstUser = (await usersModel.find()).length;
    const lstProduct = (await productModel.find()).length;
    res.render("admin/dashboard",{data:{lstUser,lstProduct}});
}

module.exports = {
    dashboard
}