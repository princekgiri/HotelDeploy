import React ,{useState} from 'react'
const HomeHost=()=>{
    const [details,setDetails]=useState({
        houseName:"",
        Location:"",
        photo:"",
        price:5000,
        comfort:[],
        environment:[],
        rules:[],
        cancellation:'',
        propertyType:''
    });
    const [cities,setCities]=useState(
    [
  "mumbai", "delhi", "bengaluru", "hyderabad", "chennai", "kolkata", "pune",
  "ahmedabad", "surat", "jaipur", "lucknow", "kanpur", "nagpur", "indore",
  "bhopal", "patna", "vadodara", "ludhiana", "agra", "nashik", "rajkot",
  "varanasi", "meerut", "amritsar", "ranchi", "coimbatore", "vijayawada",
  "guwahati", "bhubaneswar", "chandigarh"
]);
    const [min,setMin]=useState(5000);
    const [suggesstions,showSuggestions]=useState([
    ]);
    const onClick=(e)=>{
        e.preventDefault();
        const {name,value}=e.currentTarget;
        console.log(name,value);
        const city=value.slice(0,1).toUpperCase()+value.slice(1);
        setDetails({...details,[name]:city});
        showSuggestions(null);
    }
    const onInput=(e)=>{
        e.preventDefault();
        const {value,name}=e.currentTarget;
        console.log("The value that is obtained is ",value);
        setDetails(()=>{
            const updated={...details,[name]:value};
            return updated;
        });
        setMin(value);
    }
    const onClickCheck = (e) => {
    const { name, value, checked } = e.target; // checked tells if it's checked or not
    setDetails(prev => {
        let updatedArray;
        if (checked) {
            updatedArray = [...prev[name], value]; // add
        } else {
            updatedArray = prev[name].filter(item => item !== value); // remove
        }
        const newArray={ ...prev, [name]: updatedArray };
        console.log(newArray);
        return newArray;
    });
};

    const onChange=(e)=>{
        const {name,value,checked}=e.currentTarget;
        setDetails({...details,[name]:value});
        showSuggestions(()=>{
            const updated=cities.filter(city=>city.toLowerCase().includes(value));
            return updated;
        })
        if (details.Location.length==1){
            showSuggestions(null);
        }
    }
    const JustSee=(e)=>{
        const {value,name,checked}=e.target;
        setDetails(()=>{
            const updated={...details,[name]:value};
            console.log(updated);
            return updated;}
        )
    }
return(
    <>
    <div>
        <form action="http://localhost:3000/upload" method="POST" entype="multipart/form-data">
        <label htmlFor="houseName">Housename</label>
        <input type="text" name="houseName" value={details.houseName} id="houseName" onChange={onChange}/>
        <label htmlFor="Location">Location</label>
        <input type="text" name="Location" value={details.Location} onChange={onChange}/>
        <div>
           {suggesstions && suggesstions.map((suggestion,index)=>{
            return(
                <React.Fragment key={index}>
                <button type="button" onClick={onClick} value={suggestion} name="Location">&nbsp;&nbsp;{suggestion}&nbsp;&nbsp;</button>
                </React.Fragment>
            )
           })} 
        </div>
        <label htmlFor="price">Price</label>
        <span>{min}</span>&nbsp;&nbsp;<input type="range" min="5000" max="50000" step="300" name="price" value={details.price} onInput={onInput}></input>&nbsp;&nbsp;<span>50000</span>

         <p>Occupancy Type</p> 
         <label htmlFor="solo">solo</label>
         <input type="radio" name="occupancy" value="solo" id="solo"/>
         <label htmlFor="group">group</label>
         <input type="radio" name="occupancy" value="group" id="group" />
         <label htmlFor="couples">couples</label>
         <input type="radio" name="occupancy" value="couples" id="couples"/>
         <label htmlFor="family">Family</label>
         <input type="radio" name="occupancy" value="family" id="family"/>


        
        <p>Choose the comfort from below</p>
        <label htmlFor="AC">AC</label> 
        <input type="checkbox" id="AC" name="comfort" value="AC" onChange={onClickCheck} checked={details.comfort.includes("AC")}/>
        <label htmlFor="Wi-fi">Wi-fi</label>
        <input type="checkbox" id="Wi-fi" name="comfort" value="Wi-fi" onChange={onClickCheck} checked={details.comfort.includes("Wi-fi")}/>
        <label htmlFor="Geyser">Geyser</label>
        <input type="checkbox" id="Geyser" name="comfort" value="Geyser" onChange={onClickCheck} checked={details.comfort.includes("Geyser")}/>
        <label htmlFor="Washing-machine" value="Washing-machine">Washing-machine</label>
        <input type="checkbox" id="Washing-machine" name="comfort" value="Washing-machine" onChange={onClickCheck} checked={details.comfort.includes("Washing-machine")}/>


        <p>Choose Environment </p>
        <input type="checkbox" name="environment" value="Social" id="Social" onChange={onClickCheck} checked={details.environment.includes("Social")}/>
        <label htmlFor="Social">Social</label>
        <input type="checkbox" name="environment" value="Romantic" id="Romantic" onChange={onClickCheck} checked={details.environment.includes("Romantic")}/>
        <label htmlFor="Romantic">Romantic</label>
        <input type="checkbox" name="environment" value="Modern" id="Modern" onChange={onClickCheck} checked={details.environment.includes("Modern")}/>
        <label htmlFor="Modern">Modern</label>
        <input type="checkbox" name="environment" value="Nature" id="Nature" onChange={onClickCheck} checked={details.environment.includes("Nature")}/>
        <label htmlFor="Nature">Nature</label>

           <h3>Rules For Your Homes</h3>
        <input type="checkbox" id="no-smoking" name="rules" value="no-smoking" onChange={onClickCheck} checked={details.rules.includes("no-smoking")}/>
        <label htmlFor="no-smoking">No-Smoking</label>
        <input type="checkbox" id="no-parties" name="rules" value="no-parties" onChange={onClickCheck} checked={details.rules.includes("no-parties")} />
        <label htmlFor="no-parties">No-Parties</label>

        <h3>Cancellation option</h3>
        <label htmlFor="yes" >Yes</label>  
        <input type="radio" name="cancellation" id="yes" value="yes" onChange={JustSee}/>
        <label htmlFor="no">No</label>
        <input type="radio" name="cancellation" id="no" value="no" onChange={JustSee}></input>


        <h3>Select Property Type</h3>
        <label htmlFor="apartment">Apartment</label>  
        <input type="radio" name="propertyType" value="apartment" id="apartment" onChange={JustSee}/>
        <label htmlFor="house">House</label>
        <input type="radio" value="house" name="propertyType" id="house" onChange={JustSee}/>
        <label htmlFor="bungalow">Bungalow</label>
        <input type="radio" value="bungalow" name="propertyType" id="bungalow" onChange={JustSee}/>

        {/* Files to Be Uploaded */}<br></br>
        <input type="file" name="photo" value={details.photo} onChange={onChange}/>
        <button type="submit">Submit form</button>
        </form>
    </div>
    </>
)
}

export default HomeHost