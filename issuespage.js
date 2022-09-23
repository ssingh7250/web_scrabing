const cheerio=require("cheerio");
//const { head } = require("request");
const request=require("request");
const fs=require("fs");
const path=require("path");
const pdfkit=require("pdfkit");
function getissueshtml(url,topic,reponame)
{
    request(url,cb);

    function cb(error,response,html)
    {
        if(error)
        {
            console.log(error);
        }
        else if(response.statusCode==404)
        {
            console.log("page is not found");
        }
        else{
        //console.log(html);
            getissues(html,topic);
        }
    }




function getissues(html,topic)
{
    let $=cheerio.load(html);
    let issueselemarr= $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title")
    let arr=[];
    console.log(issueselemarr.length);
    for(let i=0;i<issueselemarr.length;i++)
    {
        let link=$(issueselemarr[i]).attr("href");
        //console.log(link);
        arr.push(link);
    }
        //console.log(topic,"   ",arr);
    let folderpath=path.join(__dirname,topic);
    dircreater(folderpath);
    let filepath=path.join(folderpath,reponame+".pdf");
    console.log(filepath);
    let text=JSON.stringify(arr);

    let pdfdoc=new pdfkit();
    pdfdoc.pipe(fs.createWriteStream(filepath));
    pdfdoc.text(text);
    pdfdoc.end();
}


function dircreater(folderpath)
{

    if(fs.existsSync(folderpath)==false)
    {
        fs.mkdirSync(folderpath);
    }



}

}

module.exports=getissueshtml;