export default async (req, res) => {
  const authed = req.headers['Authorization'] == 'Bearer ' + process.env.TOKEN

  if (!authed) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // GIB EMAIL...
}