import app from './app';

app.use('/', (req, res) => {
	res.send('hola express con eslint');
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));