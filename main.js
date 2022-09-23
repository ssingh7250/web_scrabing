const cheerio=require("cheerio");
const request=require("request");
const fs=require("fs");

const getfullreposhtml=require("./resposhtml");

let url="https://github.com/topics";

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
            gettopiclink(html);
        }
}

function gettopiclink(html)
{
    let $ =cheerio.load(html);
    let linkelemarr=$(".no-underline.d-flex.flex-column.flex-justify-center");
    //no-underline d-flex flex-column flex-justify-center
 
    for(let i=0;i<linkelemarr.length;i++)
    {
        let href=$(linkelemarr[i]).attr("href");
        //console.log(href);
        let topic =href.split("/").pop();
        let fulllink=`https://github.com${href}`;

        getfullreposhtml(fulllink,topic);
    }
}