## AutoQuotes

## Background
Mechanic shops deal with a lot of inefficiencies regarding the generation of quotes to customers. 
When clients need a service or inspection done, they need to call a shop and negotiate a suitable time via the phone. If the job includes an actual repair to the vehicle, then the service advisor manually generates a quote and reaches out to different suppliers to acquire parts quotes and availabilities. After this, the advisor sends the assembled quote to the customer, at which point they again need to negotiate a time range acceptable for both parties. 
This Manual Quoting process is extremely labor intensive, costly, and feels like a chore to both the customer and the service center alike. 

## Description
This document outlines a platform that serves multiple purposes to various kinds of mechanic shops and dealerships. Auto Quotes can work on every shop, without regard to the size, the number of franchises, and the business model.
Creating multiple quotes for different customers with diverse needs has been a hustle for service advisors through the years. Using an automated quote generation system, Auto Quotes makes this task easier both for the customers and employees.
Quotations are divided into two different sections.
1.	Quotations with all required parts available in stock will be given immediately using our database data,
2.	When some parts are not available or included in our database, Auto Quotes must contact multiple reserved suppliers and ask for parts availability and details. This task is done by sending emails to contracted suppliers with auto-generated links that lead them to a form on a website. This form includes customers’ car specifications using user inputs and information on the asking part. Suppliers are responsible for entering the details, including sale price, retail price, warranty, manufacturer, and condition. Then customers get noticed through email to complete their quotation by choosing between the options.

# Company Value Add
Auto Quotes allows our company to create a close relationship with many mechanic shops and builds valuable connections with part suppliers. With the first iteration of the software, either a monthly fee or a per-use fee is charged to customers. With the next iteration, Auto Quotes can transcend the current SaaS setup and offer an integrated payment system with POS terminals. Being directly tied into the payment process would allow for a cut from every sale the mechanics shop makes, making Auto Quotes a very lucrative business.

# Customer Value Add
Auto Quotes will bring value to businesses in multiple ways. 
•	It helps the company's marketing since it helps to get customers' attention and build a list of clients for sending out promotions and seasonal deals.
•	It pushes the customer into using the services after getting a quote. Customers can look up the shop schedule and book an appointment for service on quotes on the same webpage. This option will make services much easier for customers since they get informed of the time, price, and availability in advance.
•	Another advantage of using this system would be reducing the workload of the service advisors.
•	The system incorporates an internal UI, where staff members can update the inventory, register recalls, and keep track of parts inventory and catalog.

# End-User Value Add
Auto Quotes will allow customers with zero to little knowledge of auto services to understand the various available services at the designated shop and do different actions based on their needs.
Getting immediate informative quotes for all the available services that include service details such as:
•	Accurate labor cost estimation,
•	Required parts prices with diverse options,
•	Detailed information on parts, including the manufacturer, warranty, condition (New or Remanufactured), and wait time if applicable,
•	And Service time estimation.

## Scope
# What is Included
The project includes the development of a Back-end system, run on a PaaS provider like Heroku. Its code is written in NodeJS, and it provides internal REST APIs for the front-end interfaces. It stores all relevant information in MongoDB (Atlas) and uses SendGrid as a complete email-sending solution. 
 
Three separate Web GUIs are to be implemented, built on top of React: 
•	A customer-facing one, where the end-user can manage booking, view service information, manage quotes, etc. 
•	One for the parts suppliers, where they can use to enter their quotes based on the emails they receive 
•	One for the internal use of mechanic shops where they can do basic administration, add/remove users, manage stalls, view orders, customer contact information, etc. 

These interfaces can be hosted on any of the large CDN providers such as Netlify or Amazon S3. 
# What is Not Included
The project, in its MVP form, will not provide the following features, that the company can develop as an upgrade for subsequent releases later:
•	 An accounting/billing module, that offers POS integration, and would allow the company to take a cut from all sales
•	A direct marketing/email campaign module, that could leverage the information collected from end-users
•	A price lookup feature using a "specificity backoff" logic (try to look up the price for a service based on make, model year, then make model, then make, then fall back to a generic price)
•	Integration to supplier APIS. As the platform drives increasing revenue, many suppliers will be interested in us using direct access to their databases.
## Justification
Auto Quotes solves a real-world issue that many auto-repair shops face throughout the world. It provides a turn-key solution that single businesses or even franchises could adopt and use to manage and help their day-to-day operation, decrease the number of chores, and drive revenue. From a technical standpoint, it builds on a PaaS provider and provides a SaaS-like experience to our company's customers. In this project, the team includes the following pieces, as building blocks:
•	Complete database design built on top of MongoDB,
•	A modern, node 18-based Back-end application featuring database integration, authentication/authorization, session management, e-mail sending capabilities, Payment system integration, and more, providing a Restful API for our front-end interfaces to connect to,
•	An internal API documentation, using Swagger and OAS3,
•	Three separate front-end web applications, to be used by separate stakeholder groups, built using cutting-edge, React18 features,
•	And a CI integrated End-to-End testing suite that makes sure every production deployment works as expected

This project presents a true capstone to our journey with Seneca. It makes effective use of the knowledge provided in many different branches of study, like OOP (IPC144, OOP244, OOP345, JAC444), Communications (CPR101, DCF255), Database (DBS211, DBS311), Web (WEB222, WEB322, WEB 422), Project management (SYD366, SYD466) and other mandatory and optional courses.

