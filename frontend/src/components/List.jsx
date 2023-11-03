import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import styles from "./List.module.css";
import instance from "../services/APIService";
import filterButton from "../assets/icons/filter.png";
import sortDateButton from "../assets/icons/calendar.png";
import sortRatingButton from "../assets/icons/star.png";
import arrow from "../assets/icons/arrow.png";
import ModalWrapper from "./ModalWrapper/ModalWrapper";
import BasicModal from "./ModalWrapper/BasicModal";

function List({ part }) {
  const { logout } = useUserContext();
  const navigate = useNavigate();
  const [itemsToDisplay, setItemsToDisplay] = useState(null);
  const [sortedList, setSortedList] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [filters, setFilters] = useState({});
  const [sortOption, setSortOption] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = useRef(25);

  useEffect(() => {
    instance
      .get(`/${part}`)
      .then((response) => {
        setItemsToDisplay(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          logout(true);
        }
      });
  }, []);

  const handleClickFilter = () => {
    setOpenModal(true);
  };

  const handleChange = (e) => {
    setPage(1);
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleClickSortDate = () => {
    setPage(1);
    const sortedItemsToDisplay = itemsToDisplay.slice();
    const dateByPart = {
      movies: "when_seen",
      books: "when_read",
      comics: "when_read",
      discs: "when_listened",
    };
    switch (sortOption) {
      case "dateDesc":
        setSortOption("dateAsc");
        sortedItemsToDisplay.sort(
          (a, b) =>
            new Date(a[dateByPart[part]]) - new Date(b[dateByPart[part]])
        );
        break;
      case "dateAsc":
        setSortOption(null);
        break;
      default:
        setSortOption("dateDesc");
        sortedItemsToDisplay.sort(
          (a, b) =>
            new Date(b[dateByPart[part]]) - new Date(a[dateByPart[part]])
        );
    }
    setSortedList(sortedItemsToDisplay);
  };

  const handleClickSortRating = () => {
    setPage(1);
    const sortedItemsToDisplay = itemsToDisplay.slice();
    switch (sortOption) {
      case "ratingDesc":
        setSortOption("ratingAsc");
        sortedItemsToDisplay.sort((a, b) => a.rating - b.rating);
        break;
      case "ratingAsc":
        setSortOption(null);
        break;
      default:
        setSortOption("ratingDesc");
        sortedItemsToDisplay.sort((a, b) => b.rating - a.rating);
    }
    setSortedList(sortedItemsToDisplay);
  };

  const pagination = () => {
    const pages = [];
    for (
      let i = 1;
      i <= Math.ceil(itemsToDisplay.length / itemsPerPage.current);
      i += 1
    ) {
      pages.push(
        <li key={`page ${i}`}>
          <button
            type="button"
            className={
              page === i ? styles.activePageButton : styles.inactivePageButton
            }
            onClick={() => setPage(i)}
          >
            {i}
          </button>
        </li>
      );
    }
    return pages;
  };

  const filterMenu = () => {
    return (
      <div className={styles.filters}>
        <div className={styles.filtersPart}>
          <p>Prêtés ?</p>
          <div className={styles.filtersButtons}>
            <div className={styles.filtersButton}>
              <input
                name="is_lent"
                type="radio"
                value="1"
                onChange={(e) => handleChange(e)}
                defaultChecked={filters.is_lent && filters.is_lent === "1"}
              />
              <label htmlFor="is_lent">Oui</label>
            </div>
            <div className={styles.filtersButton}>
              <input
                name="is_lent"
                type="radio"
                value="0"
                defaultChecked={filters.is_lent && filters.is_lent === "0"}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="is_lent">Non</label>
            </div>
          </div>
        </div>
        <div className={styles.filtersPart}>
          <p>Possédés ?</p>
          <div className={styles.filtersButtons}>
            <div className={styles.filtersButton}>
              <input
                name="owned"
                type="radio"
                value="1"
                onChange={(e) => handleChange(e)}
                defaultChecked={filters.owned && filters.owned === "1"}
              />
              <label htmlFor="owned">Oui</label>
            </div>
            <div className={styles.filtersButton}>
              <input
                name="owned"
                type="radio"
                value="0"
                onChange={(e) => handleChange(e)}
                defaultChecked={filters.owned && filters.owned === "0"}
              />
              <label htmlFor="owned">Non</label>
            </div>
          </div>
        </div>
        {part === "movies" ? (
          <div className={styles.filtersPart}>
            <p>Vus ?</p>
            <div className={styles.filtersButtons}>
              <div className={styles.filtersButton}>
                <input
                  name="is_seen"
                  type="radio"
                  value="1"
                  onChange={(e) => handleChange(e)}
                  defaultChecked={filters.is_seen && filters.is_seen === "1"}
                />
                <label htmlFor="is_seen">Oui</label>
              </div>
              <div className={styles.filtersButton}>
                <input
                  name="is_seen"
                  type="radio"
                  value="0"
                  onChange={(e) => handleChange(e)}
                  defaultChecked={filters.is_seen && filters.is_seen === "0"}
                />
                <label htmlFor="is_seen">Non</label>
              </div>
            </div>
          </div>
        ) : null}
        {part === "discs" ? (
          <div className={styles.filtersPart}>
            <p>Ecoutés ?</p>
            <div className={styles.filtersButtons}>
              <div className={styles.filtersButton}>
                <input
                  name="is_listened"
                  type="radio"
                  value="1"
                  onChange={(e) => handleChange(e)}
                  defaultChecked={
                    filters.is_listened && filters.is_listened === "1"
                  }
                />
                <label htmlFor="is_listened">Oui</label>
              </div>
              <div className={styles.filtersButton}>
                <input
                  name="is_listened"
                  type="radio"
                  value="0"
                  onChange={(e) => handleChange(e)}
                  defaultChecked={
                    filters.is_listened && filters.is_listened === "0"
                  }
                />
                <label htmlFor="is_listened">Non</label>
              </div>
            </div>
          </div>
        ) : null}
        {part === "comics" || part === "books" ? (
          <div className={styles.filtersPart}>
            <p>Lus ?</p>
            <div className={styles.filtersButtons}>
              <div className={styles.filtersButton}>
                <input
                  name="is_read"
                  type="radio"
                  value="1"
                  onChange={(e) => handleChange(e)}
                  defaultChecked={filters.is_read && filters.is_read === "1"}
                />
                <label htmlFor="is_read">Oui</label>
              </div>
              <div className={styles.filtersButton}>
                <input
                  name="is_read"
                  type="radio"
                  value="0"
                  onChange={(e) => handleChange(e)}
                  defaultChecked={filters.is_read && filters.is_read === "0"}
                />
                <label htmlFor="is_read">Non</label>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className={styles.list}>
      {openModal ? (
        <ModalWrapper>
          <BasicModal
            modalText="Tu veux des filtres ?"
            closeModal={() => setOpenModal(false)}
            actionYesButton={() => {
              setOpenModal(false);
            }}
            actionNoButton={() => {
              setPage(1);
              setFilters({});
              setOpenModal(false);
            }}
            setOpenModal={setOpenModal}
            part={part}
            filter
            filterMenu={filterMenu}
          />
        </ModalWrapper>
      ) : null}
      <div className={styles.actionButtons}>
        <button
          className={styles.filter}
          type="button"
          onClick={handleClickFilter}
        >
          <img src={filterButton} alt="Filtres" />
        </button>
        <button
          className={styles.sortDate}
          type="button"
          onClick={handleClickSortDate}
        >
          <img src={sortDateButton} alt="Tri par date de consommation" />
          {sortOption === "dateDesc" || sortOption === "dateAsc" ? (
            <img
              className={
                sortOption === "dateDesc" ? styles.arrowDesc : styles.arrowAsc
              }
              src={arrow}
              alt=""
            />
          ) : null}
        </button>
        <button
          className={styles.sortRating}
          type="button"
          onClick={handleClickSortRating}
        >
          <img src={sortRatingButton} alt="Tri par note" />
          {sortOption === "ratingDesc" || sortOption === "ratingAsc" ? (
            <img
              className={
                sortOption === "ratingDesc" ? styles.arrowDesc : styles.arrowAsc
              }
              src={arrow}
              alt=""
            />
          ) : null}
        </button>
      </div>
      <div className={styles.pagination}>
        <ul className={styles.pages}>{itemsToDisplay && pagination()}</ul>
      </div>
      <div className={styles.itemsToDisplay}>
        {sortedList
          ? sortedList
              .slice(
                (page - 1) * itemsPerPage.current,
                page * itemsPerPage.current
              )
              .filter((item) => {
                return (
                  Object.keys(filters).length === 0 ||
                  ((!filters.owned ||
                    parseInt(filters.owned, 10) === item.owned) &&
                    (!filters.is_lent ||
                      parseInt(filters.is_lent, 10) === item.is_lent) &&
                    (!filters.is_seen ||
                      parseInt(filters.is_seen, 10) === item.is_seen) &&
                    (!filters.is_read ||
                      parseInt(filters.is_read, 10) === item.is_read) &&
                    (!filters.is_listened ||
                      parseInt(filters.is_listened, 10) === item.owned))
                );
              })
              .map((item) => {
                return (
                  <button
                    key={`${part}${item.id}`}
                    className={styles.listButtons}
                    type="button"
                    onClick={() => navigate(`/${part}/${item.id}`)}
                  >
                    <p>{item.title}</p>
                  </button>
                );
              })
          : itemsToDisplay &&
            itemsToDisplay
              .slice(
                (page - 1) * itemsPerPage.current,
                page * itemsPerPage.current
              )
              .filter((item) => {
                return (
                  Object.keys(filters).length === 0 ||
                  ((!filters.owned ||
                    parseInt(filters.owned, 10) === item.owned) &&
                    (!filters.is_lent ||
                      parseInt(filters.is_lent, 10) === item.is_lent) &&
                    (!filters.is_seen ||
                      parseInt(filters.is_seen, 10) === item.is_seen) &&
                    (!filters.is_read ||
                      parseInt(filters.is_read, 10) === item.is_read) &&
                    (!filters.is_listened ||
                      parseInt(filters.is_listened, 10) === item.owned))
                );
              })
              .map((item) => {
                return (
                  <button
                    key={`${part}${item.id}`}
                    className={styles.listButtons}
                    type="button"
                    onClick={() => navigate(`/${part}/${item.id}`)}
                  >
                    <p>{item.title}</p>
                  </button>
                );
              })}
      </div>
    </div>
  );
}

export default List;

List.propTypes = {
  part: PropTypes.string.isRequired,
};
