import React, { Component } from 'react'
import $ from 'jquery'

export default class DomainSearch extends Component {
  constructor(props) {
    super(props)
    this.AjaxSearchBTN = React.createRef()
    this.lang = props.lang    
  }
    state = {
        featuredTLDS: [],
        DomainResults: [],
        APIusername: "", // Change API key
        clientID: "" , //change me
        clientSecret: "", //change me
        AjaxSearch: this.props.ajax,
        Loader: false,
        showRelated: this.props.related,
    }
    
    useDomainSearch = (domain, tlds) => {
      return new Promise((resolve, reject) => {
        this.setState({
          Loader: true
        })

        const self = this
        var rtype = 'taken'; // check availability
        var apikey = this.state.APIusername // your API key// make API call
            $.get('http://api.whoapi.com/?domain='+ domain +'&r='+ rtype +'&apikey='+ apikey,
            function(domainname){
              if (domainname.taken === 1) {
                self.setState({
                  Loader: false
                })
                resolve('Taken')            
              } else {
                self.setState({
                  Loader: false
                })
                resolve('Available')
              }
            });
      });
      
    }

    useEngine = () => {
        const TLDS = [
            { name: '.com', price: '5.50' },
            { name: '.net', price: '5.50'},
            { name: '.org', price: '5.50' },
            { name: '.xyz', price: '1.24' },
        ]

        this.refreshTLDS(TLDS)
    }

    refreshTLDS = (TLD) => {
        this.setState({
            featuredTLDS: TLD 
        })
    }

    AjaxLoader = (secs) => {
      return new Promise((resolve, reject) => {
        this.setState({
          Loader: true
        })
        
        setTimeout(() => {
          this.setState({
            Loader: false
          })
  
         resolve(true)
        }, secs)  
      })
    }
  
    retrieveTLDPrice = (domain) => {
      var Price = ''
      this.state.featuredTLDS.forEach(tld => {
        for (let key in tld) {
          if (domain.includes(tld[key]))
          {
            var TLD = tld[key]
           this.state.featuredTLDS.map((tld, idx) => {
             if (tld.name === TLD) {
               Price = tld.price
             }
           })
          }
        }
        })
        return Price
    }

    autoInputTLD = (query) => {
      return new Promise((resolve, reject) => {
      this.state.featuredTLDS.forEach(tld => {
        for (let key in tld) {
          if (query.includes(tld[key]))
          {
            
            resolve('')
          } else if (!query.includes(tld[key]) && !query.includes('.')) {
            resolve('.com')
          }
        }
        })
      })
    }

    getDomainResults = (query) => {
      // using ajax loader
      this.AjaxLoader(600).then(result => {

        if (this.state.APIusername) {
        
        // Resolve TLD
        this.autoInputTLD(query).then(tld => {

         // get suggestions
        this.getSuggestions(query).then(suggestions => {

          // Use the Domain search engine
          this.useDomainSearch(query + tld, tld).then(status => {

          var isAvailablecheck = false;
          var isUnavailable = false
            if (status === "Available") {
              isAvailablecheck = true
              isUnavailable = false
            } else {
              isAvailablecheck = true
              isUnavailable = true
            }

          const Price = this.retrieveTLDPrice(query + tld)
        if (query && status && isAvailablecheck) {                    
            const domainResult = [
                { domain: query + tld, availbility: status, price: Price, unavailible: isUnavailable},
            ]
            this.setState({
                DomainResults: domainResult
            })

            if (this.state.showRelated) {
                
                const relatedResults = [
                    { domain: 'gmadapptest.com', availbility: 'Availible', price: '15.98', unavailible: false },
                    { domain: 'gmadapptestapp.com', availbility: 'Availible', price: '15.98', unavailible: false },
                    { domain: 'gmadapp.xyz', availbility: 'Availible', price: '1.24', unavailible: false },
                    { domain: 'gmadapptest.xyz', availbility: 'Availible', price: '1.24', unavailible: false },
                    { domain: 'gmatest.com', availbility: 'Taken', price: '15.98', unavailible: false },
                    { domain: 'gammingservers.cloud', availbility: 'Availible', price: '15.98', unavailible: false }
                ]

                this.setState({
                    DomainResults: [
                        ...domainResult,
                        ...relatedResults,
                        ...suggestions
                    ]
                })
            }
        }
      })
      })
          })
        } else {
          alert("Please enter your API key")
        }
      }) 
    }

    handleSearch = (e) => {
      setTimeout(() => {
        if (e.target.value) {
          this.clearDomainResults()
          this.getDomainResults(e.target.value)
          } else {           
            this.clearDomainResults()
          }
      }, 1050)
    }

    handleSearchBTN = (e) => {
      setTimeout(() => {
        if (e) {
          this.clearDomainResults()
          this.getDomainResults(e)
          } else {
            this.clearDomainResults()
          }
      }, 1050)
    }

    clearDomainResults = () => {
      this.setState({
        DomainResults: [],
        relatedResults: []
      })
    }

    getSuggestions = (domain) => {
      return new Promise((resolve, reject) => {
        const userId = this.state.clientID
        const apikey = this.state.clientSecret

        $.get('https://test.httpapi.com/api/domains/v5/suggest-names.json?auth-userid=' + userId + '&api-key=' + apikey + '&keyword=' + domain,
            function(suggestions){
              if (suggestions) {              
              resolve(suggestions)
              } else {
                reject("No suggestions found...")
              }
            });
      })    
    }
    addToCart = (data) => {
        // Do something

        window.location.href = '/signup/1?domain=' + data.domain
    }

    componentDidMount(){
        this.useEngine()
    }

    render() {      
        return (
            <div>
              <div class="bg-white p-4 w-50 rounded-md">
                {this.state.AjaxSearch ? (
                  <h1 class="text-lg font-bold text-gray-500">Domain ajax Search</h1>
                ) : (
                  <h1 class="text-lg font-bold text-gray-500">Domain Search</h1>
                )}
    <div class="mt-5 mb-2 border-2 py-1 px-3 flex justify-between rounde-md rounded-md">
      <input onChange={this.state.AjaxSearch ? (this.handleSearch) : (<></>)} class="flex-grow outline-none text-gray-600 focus:text-blue-600" type="text" placeholder="Domain Search" ref={this.AjaxSearchBTN}/>
      {!this.state.AjaxSearch &&
      <button onClick={() => this.handleSearchBTN(this.AjaxSearchBTN.current.value)} class="btn btn-wide">Search...</button> 
      }
      <spa>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 hover:text-blue-400 transition duration-100 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </spa>
    </div>
    {this.state.AjaxSearch ? (
      <h3>Search results apear in real-time</h3>
    ) : (
      <></>
    )}      
  </div> 
                <div className="domain-search container" ajax={this.state.AjaxSearch}>                                    
                        <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Domain Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Availability
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>                 
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Choose Domain</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {this.state.DomainResults.map((domainName, idx) => (
                  <tr key={domainName.domain}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpluspng.com%2Fimg-png%2Fdomain-icon-png-50-px-1600.png&f=1&nofb=1" alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{domainName.domain}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{domainName.availbility}</div>
                      <div className="text-sm text-gray-500"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      ${domainName.price}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {domainName.unavailible ? (
                            <div className="empty-btn">

                            </div>
                        ) : (
                            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => (this.addToCart(domainName))} data-btn="add">Choose Domain</button>                            
                        )}                    
                    </td>
                  </tr>
                ))}
              </tbody>
              {this.state.Loader ? (
              <tbody className="bg-white divide-y divide-gray-200 spinner" data-spinner>              
                  <tr key="spinner">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpluspng.com%2Fimg-png%2Fdomain-icon-png-50-px-1600.png&f=1&nofb=1" alt="" />
                        </div>
                        <div className="ml-4">
                        {/* Add your icon here */}
                        </div>
                      </div>
                    </td>
                  </tr>
              </tbody>
              ) : (
                <></>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>

      <br />

    <div className="domain-tlds">
    <section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap w-full mb-8">
      <div class="w-full mb-6 lg:mb-0">
        <h1 class="sm:text-4xl text-5xl font-medium title-font mb-2 text-gray-900">TLDS</h1>
        <div class="h-1 w-20 bg-indigo-500 rounded"></div>
      </div>
    </div>
    <div class="flex flex-wrap -m-4 text-center">
    {this.state.featuredTLDS.map((tld, idx) => (
      <div class="p-4 sm:w-1/4 w-1/2" key={tld.name}>
        <div class="bg-indigo-500 rounded-lg p-2 xl:p-6">
            <h2 class="title-font font-medium sm:text-4xl text-3xl text-white">{tld.name}</h2>
            <p class="leading-relaxed text-gray-100 font-bold">${tld.price}</p>
        </div>
      </div>
    ))}      
    </div>
  </div>
</section>
</div>              
</div>
        )
    }
}
