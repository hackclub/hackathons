export default async (req, res) => {
  const token = process.env.TOKEN
  if (!token) {
    return res.status(200).json({msg: 'No token set, are you in dev/preview?'})
  }

  const authed = req.headers['Authorization'] == 'Bearer ' + token

  if (!authed) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // GIB EMAIL...
}