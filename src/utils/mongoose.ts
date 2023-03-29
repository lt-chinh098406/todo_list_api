export const multipleMongooseToObject = (mongooseArrays: any) => {
  return mongooseArrays.map((mongooseArray: any) =>
    mongooseArray.toObject({ getters: true })
  )
}

export const mongooseToObject = (mongoose: any) => {
  return mongoose ? mongoose.toObject({ getters: true }) : mongoose
}
