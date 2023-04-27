# burring_front

-> shouldn't do all the picture at once as it's quite heavy to transfert. Maybe should have done the image treatment
one by one so that the user can start using the application with the first image and not wait for all the image
to be processed to be able to see the first one.

-> Validation of the JSON should have been done on the frontend part with error message corresponding to every 
possible error case of the user.

-> The result attribute corresponding to the result of the burring process is sent by the backend in String. It should
be a JSON directly, but as SQL lite just save text and no JSON, it would require some more entities (I don't have the time).
Furthermore there is also None instead of null in the JSON