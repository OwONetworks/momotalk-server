import { Router } from "express";
import fs from 'fs'
import path from 'path'

const route = Router();

route.get('/:id', (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send('Missing id')
    return
  }

  if (id.includes('..') || id.includes('/')) {
    res.status(400).send('Invalid id')
    return
  }

  const avatarPath = path.join(__dirname, '..', 'template', `${id}.png`)
  const avatar = fs.createReadStream(avatarPath)

  avatar.on('error', () => res.status(404).send('Avatar not found'))

  avatar.pipe(res)
})

export default route
