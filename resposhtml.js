const cheerio=require("cheerio");
//const { head } = require("request");
const request=require("request");
const getissueshtml=require("./issuespage");
function getfullreposhtml(url,topic)
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
            getresposelink(html,topic);
        }
    }


}


function getresposelink(html,topic)
{
    let $ =cheerio.load(html);

    let headingarr= $(".f3.color-fg-muted.text-normal.lh-condensed");
        console.log(topic);
    for(let i=0;i<8;i++)
    {   
        let twoanchor=$(headingarr[i]).find("a");
        let link=$(twoanchor[1]).attr("href");
       // console.log(link);

        let fulllink=`https://github.com${link}/issues`;

            let reponame=link.split("/").pop();
        getissueshtml(fulllink,topic,reponame);

    }

    //console.log("''''''''''''''''''''''''''''''''''''");

}

module.exports=getfullreposhtml;