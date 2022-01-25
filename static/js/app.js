const {setCountry,appendCountry} = require('./helpers')


const  getAllCountries= async () => {
    try{
        const response = await fetch('http://localhost:5500/country')

        const data = await response.json()

        setCountry(data)

    } catch (err) {
        console.error(err)
    }
};

const submitCountry = async (e) => {
    e.preventDefault();

    try {
        const countryData = {
            name: e.target.name.value,
            city: e.target.city.value
        };

        const options = { 
            method: 'POST',
            body: JSON.stringify(countryData),
            headers: { "Content-Type": "application/json"}
        };
    

        const response = await fetch('http://localhost:5500/country', options) 
        
        appendCountry(response)
    
    } catch (err) {
        console.error(err)
    }

};


// const deleteCountry = (e) => {
//     e.preventDefault();

//     const countryID = e.target.value
//     console.log(countryID)
//     try {
//         const countryID = e.target.value

//         const options = { 
//             method: 'Delete',
//         };
    

//         const response = await fetch(`http://localhost:5500/country/${countryID}`, options) 
        
        
    
//     } catch (err) {
//         console.error(err)
//     }

// };

module.exports = {getAllCountries, submitCountry}
