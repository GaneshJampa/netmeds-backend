# GEOGO Full Stack Web Internship Netmeds Clone APIs
Hey, let's make this repo all much rich as possible by contributing more endpoints. Follow the contribution guidelines, make open source contributions and make your github profile to standout. Check the Postman collection attached in this repo, this would help you to test API endpoints.

## API Index

### Category
- [x] API for listing all categories
- [x] Create new category
- [x] View category details
- [x] List all category products (medicines)
- [x] Update category
- [x] Delete a category

### Product
- [x] API for listing all products (medicines)
- [x] Create new product
- [x] View product details
- [x] Update product
- [x] Delete a product

### User
Users can signup to this application using email and password. 
__User__ model should have the following attributes: *email (type: string), password (type: string), mobile*.
*Tip:* Can use Passport and JWT for user authentication module
- [ ] API for user signup
- [ ] API for user signin
- [ ] API for user signout
- [ ] API to get user details

### Order
Users can place orders for multiple products. __Order__ model should have the following attributes: *user (ref), orderItems (array of items), serial (String), status (pending, confirmed, shipped, delivered, cancelled), orderItemTotal (Number), discount (Number), shippingCost (Number), grandTotal (Number), paymentMode (cod, card, online etc.), paidAmount (Number, Should be filled once payment made)*.
- [ ] API for listing all orders of an user
- [ ] Create new order
- [ ] View order details
- [ ] Cancel an Order
- [ ] Update an order

### Banner
Banners are image sliders that are present in website homepage. 
**Banner** model should have the following attributes: *bannerImage (type: image), isActive (type: boolean), linkedToUrl (type: string)*.
- [x] API for listing all active banners
- [x] Create new banner
- [x] Update banner
- [x] Delete a banner

### LabTest
Users can order for lab tests. __LabTest__ model can have the following attributes: *name, description, cost, discountedCost, contactNumber, isActive (boolean)*.
- [ ] API for listing all lab tests
- [ ] Create new lab test
- [ ] View lab test details
- [ ] Update lab test
- [ ] Delete a lab test

### LabTestAppointment
Users can make an appointment for a lab test. __LabTestModel__ model can have the following attributes: *user (ref), labTest (ref), pincode, appointmentDate, cost, discountedCost, contactNumber, status (scheduled, complete, cancelled), paymentMode, paymentAmount*.
- [ ] API for listing all lab test appointments for a user
- [ ] Create new lab test appointment for a user
- [ ] View lab test appointment details
- [ ] Update a lab test appointment
- [ ] Delete a lab test appointment

## How to Contribute
- Make sure you understand the requirement well.
- Fork this repository to your github account.
- Do the changes and create a Pull Request.
- Remember the PR should have clean code, proper comments, proper commits with messages.
- Many others can also make PR, but the most complete one will be merged.
- You can also create PR for this Readme, if you have any relevant module in mind for this repo, to make it even more awesome!!
