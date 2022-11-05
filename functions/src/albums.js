// import dbConnect from './dbConnect.js'
import mongoSecrets from "../mongoSecrets.js"
import {MongoClient} from 'mongodb'
const client = new MongoClient(mongoSecrets) //connection to mongodb server
const db = client.db("BocaCode")
const albums = db.collection("Albums")

export  async function getAllAlbums(req, res) {
  const filter = {} //filter nothing. give me all albums
  try{
  const allAlbums = await albums.find(filter).toArray();
  res.status(200).json(allAlbums)
  } catch (err) {
    console.log(err)
    res.status(500).json({error: err})
  }
  // const db = dbConnect()
  // db.collection('albums').get()
  //   .then(collection => {
  //     const albumsArr = collection.docs.map(doc => {
  //       return { ...doc.data(), albumId: doc.id }
  //     })
  //     res.send(albumsArr)
  //   })
  //   .catch(err => res.status(500).send({ success: false, message: err }))
}

export  async function createNewAlbum(req, res) {
const album = req.body 
//todo- validate album
try {
await albums.insertOne(album)
  await getAllAlbums(req, res)
} catch (err) {
  console.log(err)
  res.status(500).json({error: err})
}

  // const db = dbConnect()
  // db.collection('albums').add(req.body)
  //   // .then(doc => res.status(201).send({ success: true, message: 'Album created: ' + doc.id }))
  //   .catch(err => res.status(500).send({ success: false, message: err }))
}