import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { fetchFilmList } from "../../containers/AdminTemplate/FilmManagement/modules/action";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";

export default function IntroFilm() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFilmList("GP01"));
  }, []);

  const state = useSelector((state) => state.fetchFilmListReducer);
  // Tao 1 mang 2 chieu danh sach phim, moi phan tu chua 8 film de lam thanh 1 slider
  let filmList;
  if (state.data && state.data.length > 0) {
    filmList = new Array(Math.floor(state.data.length / 8) + 1);
    filmList.forEach((filmSlider) => {
      filmSlider = [];
    });

    for (let i = 0; i < filmList.length - 1; i++) {
      filmList[i] = state.data.slice(i * 8, (i + 1) * 8);
    }
    let beg = (filmList.length - 1) * 8;
    filmList[filmList.length - 1] = state.data.slice(beg, state.data.length);
  }

  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [trailer, setTrailer] = useState();
  const [id, setId] = useState();

  const handleOpen = (id) => {
    setOpen(true);
    let index = state.data.findIndex((film) => film.maPhim === id);
    if (index !== -1) {
      setId(id);
      setTrailer(state.data[index]?.trailer);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderStars = (point) => {
    if (point > 0) {
      // Tao 1 mang de xet star tu diem danh gia
      let arr = [];
      for (let i = 2; i <= point; i += 2) {
        arr.push(i);
      }

      // Them -1 vao mang cho truong hop star 1/2
      if (Number.isInteger(point) && point % 2 !== 0) {
        arr.push(-1);
      }

      return arr.map((star, index) => {
        if (star !== -1) {
          return <img key={index} alt="" src="./images/star1.png" />;
        } else {
          return <img key={index} alt="" src="./images/star1.2.png" />;
        }
      });
    }
  };

  const renderFilm = (film) => {
    if (film) {
      return (
        <div className="col-xl-3 col-lg-3 col-md-3">
          <div className="item">
            <img
              width={215}
              height={318}
              alt={film.biDanh}
              src={film.hinhAnh}
              className="film-poster border rounded"
            />
            <div className="rating">
              <p>{film.danhGia} </p>
              <div className="star">{renderStars(film.danhGia)}</div>
            </div>
            <div className="hidden-content">
              <div>
                <button
                  className="play-trailer"
                  type="button"
                  onClick={() => handleOpen(film.maPhim)}
                >
                  <img alt="" src="./images/play-video.png" />
                </button>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={film.maPhim === id ? open : false}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={film.maPhim === id ? open : false}>
                    <div className={classes.paper}>
                      <button
                        type="button"
                        className="close"
                        onClick={handleClose}
                      >
                        <HighlightOffOutlinedIcon
                          style={{
                            color: "white",
                            fontSize: 50,
                            marginTop: -30,
                            marginLeft: -25,
                          }}
                        />
                      </button>
                      <iframe
                        width="1120"
                        height="630"
                        src={`${trailer}?autoplay=1`}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        autoPlay="1"
                      ></iframe>
                    </div>
                  </Fade>
                </Modal>
              </div>
              <div className="background_hidden" />
              <button className="btn">
                <a href="#slider" className="text-white">
                  MUA VÉ
                </a>
              </button>
            </div>
            <div className="content-text">
              <div className="film-name">
                <span className="btn red-age">{`C${
                  Math.floor(Math.random() * 6) + 15
                }`}</span>
                {` ${film.tenPhim}`}
              </div>
              <div className="time-film mt-1">
                {100 + Math.floor(Math.random() * 100)} phút
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const renderFilmSlider = (filmSlider) => {
    if (filmSlider && filmSlider.length > 0) {
      return filmSlider.map((film, index) => {
        return <React.Fragment key={index}>{renderFilm(film)}</React.Fragment>;
      });
    }
  };

  const renderFilmList = () => {
    if (filmList && filmList.length > 0) {
      return filmList.map((filmSlider, index) => {
        return (
          <div
            key={index}
            className={index === 0 ? "carousel-item active" : "carousel-item"}
            data-interval={5000}
          >
            <div className="container">
              <div className="row">{renderFilmSlider(filmSlider)}</div>
            </div>
          </div>
        );
      });
    }
  };

  const renderArrow = () => {
    return (
      <React.Fragment>
        <a
          className="carousel-control-prev"
          href="#carouselExampleInterval"
          role="button"
          data-slide="prev"
          style={{
            justifyContent: "flex-end",
          }}
        >
          <span className="sr-only">Previous</span>
          <img
            style={{
              width: 50,
              height: 50,
              marginRight: -50,
            }}
            alt=""
            src="./images/back-session.png"
            className="back-img"
          />
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleInterval"
          role="button"
          data-slide="next"
          style={{
            justifyContent: "flex-start",
          }}
        >
          <span className="sr-only">Next</span>
          <img
            style={{
              width: 50,
              height: 50,
            }}
            alt=""
            src="./images/next-session.png"
            className="next-img"
          />
        </a>
      </React.Fragment>
    );
  };

  return (
    <section id="intro-film" className="intro-film">
      <div class="container box-ticket">
        <div class="row border rounded py-4 order-ticker">
          <div class="col-xl-4">
            <div class="nav-item dropdown city-drop border-right">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="text-span1">Phim</span>
              </a>
              <div
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <a class="dropdown-item" href="#">
                  Hồ Chí Minh
                </a>
                <a class="dropdown-item" href="#">
                  Hà Nội
                </a>
              </div>
            </div>
          </div>
          <div class="col-xl-2 pl-0">
            <div class="nav-item dropdown city-drop border-right">
              <a
                class="nav-link dropdown-toggle text-decoration-none"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="text-span2">Rạp</span>
              </a>
              <div
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <a class="dropdown-item" href="#">
                  Hồ Chí Minh
                </a>
                <a class="dropdown-item" href="#">
                  Hà Nội
                </a>
              </div>
            </div>
          </div>
          <div class="col-xl-2 pl-0">
            <div class="nav-item dropdown city-drop border-right">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="text-span">Ngày Xem</span>
              </a>
              <div
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <a class="dropdown-item" href="#">
                  Hồ Chí Minh
                </a>
                <a class="dropdown-item" href="#">
                  Hà Nội
                </a>
              </div>
            </div>
          </div>
          <div class="col-xl-2 pl-0">
            <div class="nav-item dropdown city-drop border-right">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="text-span">Xuất Chiếu</span>
              </a>
              <div
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <a class="dropdown-item" href="#">
                  Hồ Chí Minh
                </a>
                <a class="dropdown-item" href="#">
                  Hà Nội
                </a>
              </div>
            </div>
          </div>
          <div class="col-xl-2">
            <button type="button" class="btn px-3">
              Mua Vé Ngay
            </button>
          </div>
        </div>
      </div>
      <div className="list-film">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <a
              className="nav-link active"
              data-toggle="tab"
              href="#showing"
              role="tab"
            >
              Đang Chiếu
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" data-toggle="tab" href="#coming" role="tab">
              Sắp Chiếu
            </a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="showing"
            role="tabpanel"
          >
            <div
              id="carouselExampleInterval"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner pt-5 mt-5">{renderFilmList()}</div>
              {renderArrow()}
            </div>
          </div>
          <div className="tab-pane fade" id="coming" role="tabpanel">
            <div
              id="carouselInterval"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner pt-5 mt-5">{renderFilmList()}</div>
              {renderArrow()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
