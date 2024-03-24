const uuid = require('uuid')
const path = require('path');
const { Device, DeviceInfo } = require('../modules/module')
const ApiError = require('../error/ApiError')

class DeviceController {

   async create(req, res, next) {
      try {
         let { name, price, typeId, brandId, device_infos } = req.body;
         const { img } = req.files;
         let fileName = uuid.v4() + ".jpg"
         img.mv(path.resolve(__dirname, '..', 'static', fileName))

         const device = await Device.create({ name, price, typeId, brandId, img: fileName })

         if (device_infos) {
            device_infos = JSON.parse(device_infos);
            console.log(device_infos);
            device_infos.forEach(i =>
               DeviceInfo.create({
                  title: i.title,
                  description: i.description,
                  deviceId: device.id
               })
            )
         }

         return res.json(device)
      } catch (error) {
         next(ApiError.badRequest(error.message))
      }

   }

   async getAll(req, res) {

      let { typeId, brandId, limit, page } = req.query;
      let devices;
      page = page || 1;
      limit = limit || 9;
      let offset = limit * page - limit;
      if (!typeId && !brandId) {
         devices = await Device.findAndCountAll({ limit, offset });
      }
      if (!typeId && brandId) {
         devices = await Device.findAndCountAll({ where: { brandId }, limit, offset });
      }
      if (typeId && !brandId) {
         devices = await Device.findAndCountAll({ where: { typeId }, limit, offset });
      }
      if (typeId && brandId) {
         devices = await Device.findAndCountAll({ where: { typeId, brandId }, limit, offset });
      }
      return res.json(devices);
   }

   async getOne(req, res) {
      const { id } = req.params;

      const device = await Device.findOne({
         where: { id },
         include: [{ model: DeviceInfo, as: 'device_infos' }]
      })

      return res.json(device);

   }

}

module.exports = new DeviceController();