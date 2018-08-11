import 'reflect-metadata'
import setupDb from './db'
import {createKoaServer} from "routing-controllers"
import Controller from "./controller"

const app = createKoaServer({
   controllers: [Controller]
})

setupDb()
  .then(_ =>
    app.listen(4000, () => console.log('Listening on port 4000'))
  )
  .catch(err => console.error(err))


