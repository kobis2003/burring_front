# burring_front
This is a technical test project. It is built using Vue.js 3, typescript and jest for testing.

## How to start

### Start the backend
Go to the burring_back project and start the server from there (the indications are in the README file)

### Install the node components
Run `npm install` on a terminal on the project folder

### Start the server
Run `npm serve` on a terminal on the project folder
The address will be displayed on the terminal.

### test the blurring mechanism
Once you start the server, the page displayed will offer you to dowload a test file, so that you can test the blurring mechanism.
You can edit it to try your own input. For the specification, it is in the backend READ ME, but the parameters of the filter
comes from the ImageFilter module of the PILLOW library (https://www.tutorialspoint.com/python_pillow/python_pillow_blur_an_image.htm)

## Possible improvement on the project
-> In a perfect world, the data transferred from the backend to the frontend will be all JSON. Here it is a JSON, 
but the result field is a text containing a JSON. It's quite ugly...

-> Validation of the JSON should have been done on the frontend part with error message corresponding to every
possible error case of the user (but here the input file is really complicated to validate).

-> The process result should be a specific component imported in the BlurringPage (I think the code would be easier to read).
For now all the HTML is contained in teh BurringPage

-> Text that are visible to the user should be put into a bundle, for the moment this is raw text in the HTML

-> I am not sure I should have done all the picture at once as it's quite heavy to transfer. Maybe I should have done the image treatment
one by one so that the user can start get the first images and not have to wait for all the image
to be processed to be able to see the first one.

-> In general, if the project become more complex and I know I will spend time on it, I like to use something like: 
https://www.vuemastery.com/blog/mock-service-worker-api-mocking-for-vuejs-development-testing/ from the beginning so that
I can code without having to pay attention to the backend part (or to reproduce the actions). 

-> There are some test but only for entity parsing (honestly, I am not sure I would add a lot of other test). 

