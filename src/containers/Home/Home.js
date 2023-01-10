import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchOnePostSuccess } from "../../store/actions/postsActions";
import { Box, Card, CardActions, Typography, Grid, Link, CardContent, Button, Modal } from "@mui/material";
import Loader from "../../components/UI/Loader/Loader";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Home = () => {

  const dispatch = useDispatch();
  const { posts, post, loading } = useSelector(state => state.posts);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useState(async () => {
    await dispatch(fetchPosts())
  }, []);

  const clickHandler = async (index) => {
    await dispatch(fetchOnePostSuccess(posts[index]));
    handleOpen();
  }

  return <>
    <Loader loading={loading} />
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {post.API}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {post.Category}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {post.Description}
        </Typography>
        <Link id="modal-modal-description" sx={{ mt: 2 }} href={post.Link}>
          {post.Link}
        </Link>
      </Box>
    </Modal>
    <Grid style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginLeft: '140px' }}>
      {posts?.map((elem, i) => (
        <Card sx={{ width: '200px', margin: '15px', background: 'lightgreen' }} key={elem.id}>
          <CardContent>
            <Typography variant="h5" component="div">
              {elem.API}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Category : {elem.Category}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => clickHandler(i)} size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </Grid>
  </>;
};

export default Home;