import express from 'express'

const app = express()
const PORT = 3000



const users = [
    { id: 1, name: 'ali khan', email: 'alikhan@example.com' },
    { id: 2, name: 'jan ali', email: 'janali@example.com' },
    {id: 3, name: 'musa alam', email: 'musaalam@example.com'}
]



app.get('/api/users', (req, res) => {
    res.status(200).json({ message: 'Fetched all users!', data: users })
})

app.listen(PORT, () => {
    console.log(`Server is running here http://localhost:${PORT}`)

})