/* istanbul ignore next */
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
/* istanbul ignore next */

/* istanbul ignore next */
import env from './config/env'

/* istanbul ignore next */
MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => {
      console.log(`🚀 Server started at http://localhost:${env.port}`)
    })
  }).catch(console.error)
