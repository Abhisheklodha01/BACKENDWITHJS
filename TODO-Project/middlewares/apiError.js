export const ApiError = (err, req, res, next) => {

      err.message = err.message || "Internal server error"
      return res.status(404).json({
        success: false,
        message: err.message
      })
}

