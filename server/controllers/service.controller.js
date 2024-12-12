import Service from '../models/service.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './../helpers/dbErrorHandler.js'
import formidable from 'formidable'
import fs from 'fs'

const create = (req, res) => {
  let form = formidable({keepExtensions: true})
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(400).json({
        message: "Image could not be uploaded"
      })
    }
    Object.keys(fields).forEach(key => fields[key] = fields[key][0])
    Object.keys(files).forEach(key => files[key] = files[key][0])
    let service = new Service(fields)
    service.owner= req.profile
    if(files.image){
      service.image.data = fs.readFileSync(files.image.filepath)
      service.image.contentType = files.image.mimetype
    }
    try {
      let result = await service.save()
      res.status(200).json(result)
    }catch (err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

const serviceByID = async (req, res, next, id) => {
  try {
    let service = await Service.findById(id).populate('owner', '_id name').exec()
    if (!service)
      return res.status('400').json({
        error: "Service not found"
      })
    req.service = service
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve ro service"
    })
  }
}

const photo = (req, res, next) => {
  if(req.service.image.data){
    res.set("Content-Type", req.service.image.contentType)
    return res.send(req.service.image.data)
  }
  next()
}
const defaultPhoto = (req, res) => {
  return null
}

const read = (req, res) => {
  req.service.image = undefined
  return res.json(req.service)
}

const update = (req, res) => {
  let form = formidable({ keepExtensions: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        message: "Image could not be uploaded",
      });
    }
    Object.keys(fields).forEach((key) => (fields[key] = fields[key][0]));
    Object.keys(files).forEach((key) => (files[key] = files[key][0]));
    let service = req.service;
    service = extend(service, fields); // Fixed variable name
    service.updated = Date.now();
    if (files.image) {
      service.image.data = fs.readFileSync(files.image.filepath);
      service.image.contentType = files.image.mimetype; // Fixed typo: minetype → mimetype
    }
    try {
      let result = await service.save();
      res.json(result);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  });
};

const remove = async (req, res) => {
  try {
    let service = req.service;
    let deletedService = await Service.deleteOne({ _id: service._id }); // Fixed variable name
    res.json(deletedService);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listByOwner = async (req, res) => {
  try {
    let services = await Service.find({owner: req.profile._id}).populate('owner', '_id name')
    res.json(services)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const isOwner = (req, res, next) => {
  const isOwner = req.service && req.auth && req.service.owner._id == req.auth._id
  if(!isOwner){
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

export default {
  create,
  serviceByID,
  photo,
  defaultPhoto,
  listByOwner,
  read,
  update,
  isOwner,
  remove
}