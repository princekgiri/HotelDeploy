
const multer=require('multer');
const path=require('path');
const fs=require('fs');

const upload=path.join(__dirname,'uploads');
if(!fs.existsSync(upload)){
fs.mkdirSync(upload);
}
const images=path.join(__dirname,`uploads/images`);
if(!fs.existsSync(images)){
    fs.mkdirSync(images);
}
const scanner=path.join(__dirname,'uploads/images/scanner');
if(!fs.existsSync(scanner)){
    fs.mkdirSync(scanner);
}
const GooglePay=path.join(__dirname,'uploads/images/scanner/GooglePay')
if(!fs.existsSync(GooglePay)){
    fs.mkdirSync(GooglePay);
}
const Paytm=path.join(__dirname,'uploads/images/scanner/Paytm')
if(!fs.existsSync(Paytm)){
    fs.mkdirSync(Paytm);
}
const PhonePe=path.join(__dirname,'uploads/images/scanner/PhonePe')
if(!fs.existsSync(PhonePe)){
    fs.mkdirSync(PhonePe);
}
const homePhotos=path.join(__dirname,'uploads/images/homePhotos');
if(!fs.existsSync(homePhotos)){
    fs.mkdirSync(homePhotos);
}
const videos=path.join(__dirname,'uploads/videos');
if(!fs.existsSync(videos)){
    fs.mkdirSync(videos);
}
const homeVideos=path.join(__dirname,'uploads/videos/homeVideos');
if(!fs.existsSync(homeVideos)){
    fs.mkdirSync(homeVideos);
}

let count=0
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        let dest=''
        if(file.fieldname.includes('GooglePay') || file.fieldname.includes('[GooglePay]')){
            dest=GooglePay;
            cb(null,dest);
        }
        else if(file.fieldname.includes('housePhotos') || file.fieldname.includes('[housePhotos]') ){
            dest=homePhotos;
            cb(null,dest)
        }
        else if(file.fieldname.includes('Paytm') || file.fieldname.includes('[Paytm]')){
            dest=Paytm
            cb(null,dest)
        }
        else if(file.fieldname.includes('PhonePe') || file.fieldname.includes('[PhonePe]')){
            dest=PhonePe;
            cb(null,dest)
        }
        else if(file.fieldname.includes("houseVideos") || file.fieldname.includes("[houseVideos]")){
            dest=homeVideos;
            cb(null,dest);
        }
        else{
            cb(new Error("Invalid file "),false);
        }
    },
    filename:function(req,file,cb){
    if(file.fieldname.startsWith("houseVideos") || file.fieldname.startsWith("housePhotos") || file.fieldname.includes("housePhotos") || file.fieldname.includes("houseVideos")){
        cb(null,file.originalname);
    }
    else{
        cb(null,file.originalname);
    }
    }

})
const filefilter=(req,file,cb)=>{
    const allowed = ["GooglePay","houseVideos","PhonePe","Paytm","housePhotos"];
    const Valid=allowed.some(prefix=>file.fieldname.includes(prefix));
    if(Valid){
        cb(null,true);
    }
    else{
        cb(new Error('Invalid File Type'),false);
    }
}
exports.upload=multer({storage:storage,fileFilter:filefilter,limits:{fileSize:100*1024*1024}}).any();






// exports.upload=multer({storage:storage,fileFilter:filefilter,limits:{fileSize:50*1024*1024}}).fields([
//     {name:'GooglePay', maxCount:1},
//     {name:'Paytm',maxCount:1},
//     {name:'PhonePe',maxCount:1},
//     {name:'houseVideos',maxCount:3},
//     {name:'housePhotos',maxCount:3}
// ]
// );

