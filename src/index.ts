import express from 'express'
import { SERVER_PORT } from './config'
import { getLogger } from 'log4js'
import ChatRoute from './route/chat'
import AvatarRoute from './route/avatar'

const app = express()

app.use(express.json())

app.use('/chat', ChatRoute)
app.use('/avatar', AvatarRoute)

app.use((req, res) => res.sendFile(__dirname + '/web/index.html'))

app.listen(SERVER_PORT, () => {
  getLogger('server').info(`Server listening on port ${SERVER_PORT}`)
})
