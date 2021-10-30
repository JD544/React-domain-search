# React-domain-search
This repository provides domain search functionality for Hosting company's and Domain registrars


## Requirments

Tailwind CSS

React 

## Setup!
Changing the API Key <strong>Required</strong><br><br>
<img alt="Changing API key" src="https://user-images.githubusercontent.com/63194009/139539883-b9b36231-7096-4ab6-91ef-6af5ec9f11b6.png" />

Add Client ID and Client Secret

<img alt="Changing ID and secret" src="https://user-images.githubusercontent.com/63194009/139539883-b9b36231-7096-4ab6-91ef-6af5ec9f11b6.png" />

By adding your client id and secret. It will enable "Domain Suggestions"

You can also set "Static domain suggestions by editing this object

<img alt="Static domain suggestions" src="https://user-images.githubusercontent.com/63194009/139540347-bb7beffc-dcf7-4974-bf1e-47df98076047.png" />

## Properties

Domain: Set the name of the domain

availbility: Set the availbility status of the domain

price: Set the price of the domain 

unavailible: Boolean


# Getting an API key


Create your free account at <a href="https://my.whoapi.com/">https://my.whoapi.com/</a>

Then navigate to: Console

Click on the API key to copy it and then paste it 

## Getting a Reseller Club Client ID and secret

Login to your account at: <a href="https://manage.uk.resellerclub.com/">Your Reseller club console</a>

Navigate to: Settings> API


Copy and paste your key into the "Client Secret"

Click on the user icon to get your "Reseller ID" and paste your ID into the "Client ID"



# Displaying the Available or Unavailable  Domains

To display the domain results, firstly we have to make use of the "Map" function to dynamically show the domains


<img alt="Domain results map" src="https://user-images.githubusercontent.com/63194009/139554283-3a914497-b081-449f-b0f0-944cd8cd6397.png" />


# Displaying TLD Prices

We can also display a list of the TLDS which we can use and the price for them

<img alt="TLD map" src="https://user-images.githubusercontent.com/63194009/139554793-5b1055b3-57d7-4632-aee4-eaa25c3ba985.png" />


# Adding or Removing TLDS

We can set a list of TLDS which can be used, also we can set the price for these individually

<img alt="Domain TLD object" src="https://user-images.githubusercontent.com/63194009/139554950-cfc6a634-1059-41a3-b6d4-345af922314d.png" />


# Configuration settings

Pass parameters to the domain search engine to customize the experience

## Properties

ajax: Boolean - Defines if the search operations should happen as you type or when you click a button

related: Boolean - Enables or Disables search suggestions
