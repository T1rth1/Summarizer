import React from 'react'
import { useState , useEffect} from 'react';
import { copy, linkIcon, loader, tick} from "../assets"
import { useLazyGetSummaryQuery } from '../services/article';
const Demo = () => {
  const [article,setArticle] = useState({
    url:'',
    summary:'',
  });
  const [allArticles, setAllArticles] = useState([]);
  const[copied,setCopied] = useState("");
  const [ getSummary, { error , isFetching } ] = useLazyGetSummaryQuery();
  // this useLazyGetSummaryQuery hook return an array with two elements..
  // The first element (getSummary) is a function that triggers the API request.
//the second element is an object containing properties like error, isFetching, and others related to the state of the query.
// By destructuring the second element of the array returned by the hook, the component can access these properties(error,isFetching) directly.
useEffect(()=>{
  const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'));
  // console.log("useEffect",articlesFromLocalStorage);
  if(articlesFromLocalStorage){
    setAllArticles(articlesFromLocalStorage);
  }
},[]); // here dependies of useEffect is empty array means this useEffect caleed as soon as page is loaded...
  const handleSubmit = async (event) => {
    // alert("Submitted");
    event.preventDefault(); // to prevent the default refreshing behaviour of website
    const { data } = await getSummary({articleUrl : article.url}); // it called the function of redux which is imported from redux toolkit files..and pass current url and in redux toolkit it make a request call
    // to the api on this URL...
    // console.log(data.summary);
    if(data && data.summary){
      const newArticle = { ...article,summary:data.summary}; // we spread the "article" variable from state componet with summary(response we get back)..
      const updatedAllArticles = [newArticle,...allArticles]; // spreaded allArticles with newArticle...update allArticles array by adding newArticle and assigning to the new variable..
      setArticle(newArticle); // now "article" variable has setting up with newArticle which has "url" and "summary" both 
      setAllArticles(updatedAllArticles); // setting up "allArticles" array with new "updatedAllArticles"...
      // console.log(newArticle);
      localStorage.setItem('articles',JSON.stringify(updatedAllArticles));// save in local storage..this new updatedAllArticles saved it to the localstorage...
      // we convert it to string because local storage only contain a "string"...
    }
  }
  // first when user clicked on the submit button then article state is updated with url and called handleSubmit button and getSummary function is called from article.js
  // file and make request to the rapid api using this article.js and store.js file with current url which is entered by user..
  // now we get back the summary and update our article with summary and create a new article and set article with this new article..
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false),3000);
  }
  return (
    <section className='mt-16 w-full max-w-xl'>
      <div className='flex flex-col w-full gap-2'> {/*tailwind css was used*/}
            <form className='relative flex justify-center items-center '
              onSubmit={handleSubmit}>

              <img 
                src={linkIcon}
                alt="link_icon"
                className='absolute left-0 my-2 ml-3 w-5'/>
                <input type='url' placeholder='Enter a URL' value={article.url}
                onChange={(event)=> setArticle({...article, url: event.
                target.value})} // it create a shalow copy of article and only update the url property of article and summary property remain unchanged
                  className='url_input peer'
                />
                <button type="submit" className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'>
                   ↵
                </button>
            </form> {/*when user clicked on the submit button after entering url then this form trigger the handleSubmit function ad also 
            setting up one use state component "article" with current url.. */}
          {/* browse url history */}
          <div className='flex flex-col gap-1 max-h-60 overflow-y-auto scroll-container'>
                  {allArticles.map((item,index)=>(
                    <div key={`link-${index}`} onClick={()=>setArticle(item)} className='link_card'> {/*when click on any article url which is shown up as a history
                    then it setted up "article" variable with that particular article's url and summary which is stored in the localStorage already..*/}
                      <div className='copy_btn' onClick={()=>{handleCopy(item.url)}}>
                        <img src={copied === item.url ? tick : copy} alt="copy_icon" className='w-[40%] h-[40%] object-contain'/> {/*which url matches with current url which is in the state variable "article"
                        that all marked as a tick when you clicked on the copy button😁 */}
                      </div>
                      <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                        {item.url} {/* shows all url which has stored in localStorage.. */}
                      </p>
                    </div>
                  ))}
          </div>
      </div>

      {/* display results */}
      <div className='my-10 max-w-full flex justify-center items-center '>
            {isFetching ? (
              <img src={loader} alt='loader' className='w-20 h-20 object-contain'/>
            ) : error ? (
              <p className='font-inter font-bold text-black text-center'>Well, that wasn't supposed to happen...<br/>
                <span className='font-satoshi font-normal text-gray-700'>
                  {error?.data?.error}
                </span>
              </p>
            ) : (
              article.summary && (
                <div className='flex felx-col gap-3 flex-wrap'>
                  <h2 className='font-satoshi font-bold text-gray-600 text-xl flex-row'>
                    Article <span className='blue_gradient'>Summary</span>
                  </h2>
                  <div className='summary_box'>
                    <div className='scroll-container overflow-y-auto max-h-85 '>
                      {article.summary} {/*when user entered then and also click on the any showed history article url then current state variable "article" has been 
                      setted up with url and summary which is already stored in localStorage and here we fetched up and displayed*/}
                    </div>
                  </div>
                </div>
              )
            )}
      </div>
    </section>
  )
}

export default Demo