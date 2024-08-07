const { name } = require('ejs');
const pool = require('../db/pool');
const db = require('../db/querries');
const asyncHandler = require('express-async-handler');

const homeGet = asyncHandler(async(req, res) => {
    const category = await db.getCategory();
    const info = await db.getAllcarInfo();
    res.render('home', {category: category, info: info});
});

const getAllcars = asyncHandler(async(req, res) => {
    const cars = await db.getAllCars();
});


const getCategory = asyncHandler(async(req, res) => {
    const category = await db.getCategory();
    res.render('category', {category: category});
});

const getCarName = asyncHandler(async(req, res) => {
    const type = req.params.type;
    const name = await db.getCarName(type);
    res.render('name', {name: name});
});


//create

const createGet = asyncHandler(async(req,res) => {
    const name = await db.getAllCarName();
    res.render("create", {name: name});
});

const createCategoryPost = asyncHandler(async(req,res) => {
    const name = req.body.name;
    const type = req.body.type;
    const img = req.body.img;
    await db.createCategory(name, type,img);
    res.redirect('/')
});

//model
const createModelGet = asyncHandler(async(req, res) => {
    const name = await db.getAllCarName();
    res.render("createModel", {name: name});
})
const createModelPost = asyncHandler(async(req, res) => {
    const {name, model, price, quantity} = req.body;
    await db.createModel(name, model, price, quantity);
    res.redirect('/')
})

const detailGet = asyncHandler(async(req, res) => {
    const name = req.params.name;
    
    const detail = await db.getDetail(name);
    const image = await db.getImg(name);
    res.render("detail", {detail: detail, image: image, name: name});
})


module.exports = {
    homeGet,
    getCategory,
    getCarName,
    createGet,
    createCategoryPost,
    createModelGet,
    createModelPost,
    detailGet
}
