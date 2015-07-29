# Meadow Interview

## Setup

Requires node 0.11.13 or later. If you do not have this, you can install a specific version of node using `nvm`

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash
nvm install 0.11.13
nvm use 0.11.13
```

Then to run the application:

```
npm install
npm run watch
```

The application will be available at http://localhost:9000. All changes in code will be automatically transpiled/packaged and you can just refresh the browser.

## Directions

Please implement a products list similar to https://getmeadow.com/orgs/5. You may completely imitate the design of the list as you see now, or feel free to use your own design. Please disregard the filtering UI panel on the left side. We only want to see your implementation of the products list. Here are a few challenges with our current design that if you have some time leftover, you may work on a solution to these as a bonus:

- Product names are currently limited to one line. Is there a way to have them be multiline without messing up the vertical rhythm of the rows on the page?
- We do not currently display the vendor, but we have the data in our backend. How could the design accomodate for the vendor?

The data for the products list can be found in this api call:

```
curl -H "Accept: application/vnd.meadow+json; version=1" https://api.getmeadow.com/organizations/5/products
```

Some other bonuses to think about while developing:

- Render performance
- Code quality/structure

Lastly, you do not need to touch anything in the `server` folder. The code in there just exists to help serve the application. All of your code should go in `app`

Please implement everything in a branch that you can then open a pull request with.

## Notes

- Routing is done with React Router (https://github.com/rackt/react-router)
- CSS is written in Stylus (https://learnboost.github.io/stylus/). You can just put vanilla CSS in a stylus file and everything will work as expected. If you add any file with .styl to the `styles` folder it will automatically be included ont he page.
- For any files that contain `jsx` just use the file extension `.jsx` and it will automatically be transpiled and included on the page.
- There is a custom implementation of flux with example actions/stores. Feel free to use that implementation or use your favorite flux implementation (flummox, alt, reflux, etc.). Or don't use flux at all. Choose what you are most comfortable with.

Please spend around 2 hours on this. Afterwards we will talk about the decisions you made, how you structured things etc. It is completely okay if you do not "finish" in the time alotted. You will not be judged by how "complete" the products list is. We will compensate you with $200 for your time spent on this exercise.

If you have any questions, please email or add me on gchat: rick@getmeadow.com

