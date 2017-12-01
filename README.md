# React Project Starter

## Start

`$ docker-compose up`

### Docker Images

- nginx: Will serve the ouput of the React build. Also will redirect request to `/api/ to `api`. Config file is mounted from `/config/nginx.conf`. Listens on port 80.
- api: The back-end of the project. Default port inside container: 3000. 
- app: The react project. When this container is lifted, it will build the project and end. The ouput will be served by nginx.

# APP

## Plop

Plop automatically creates components and containers _along with their stories_ for __Storybook__, and their CSS: 

`npm run new [component|container]`

_component_ creates a new React component.
_container_ creates a new React component that is connected to the Redux Provider.

> The templates for plop are in the `/app/.plop/` folder.

## Storybook

[Storybook](https://storybook.js.org/) is already installed. To run it type:

`$ npm run storybook`

This will start the storybook server on port 6006.

## Styling

This starter uses `stylus` and `CSS modules` pattern.


# TO DO

* [ ] Add specs to storybook
