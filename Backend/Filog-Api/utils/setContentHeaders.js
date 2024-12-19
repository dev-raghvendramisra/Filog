module.exports = function (res,filename,filetype){
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    res.setHeader('Content-Type', `application/${filetype}`);
    res.setHeader('Content-Disposition', `attachment; filename=${filename}.${filetype}`);
}
