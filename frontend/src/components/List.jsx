import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import styles from "./List.module.css";
import instance from "../services/APIService";
import filterButton from "../assets/icons/filter.png";
import ModalWrapper from "./ModalWrapper/ModalWrapper";
import BasicModal from "./ModalWrapper/BasicModal";

function List({ part }) {
  const { logout } = useUserContext();
  const navigate = useNavigate();
  const [itemsToDisplay, setItemsToDisplay] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [filters, setFilters] = useState({});

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
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //   console.info(filters);
  // }, [filters]);

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
                <label htmlFor="is_listened">Oui</label>
                <input
                  name="is_listened"
                  type="radio"
                  value="1"
                  onChange={(e) => handleChange(e)}
                  defaultChecked={
                    filters.is_listened && filters.is_listened === "1"
                  }
                />
              </div>
              <div className={styles.filtersButton}>
                <label htmlFor="is_listened">Non</label>
                <input
                  name="is_listened"
                  type="radio"
                  value="0"
                  onChange={(e) => handleChange(e)}
                  defaultChecked={
                    filters.is_listened && filters.is_listened === "0"
                  }
                />
              </div>
            </div>
          </div>
        ) : null}
        {part === "comics" || part === "books" ? (
          <div className={styles.filtersPart}>
            <p>Ecoutés ?</p>
            <div className={styles.filtersButtons}>
              <div className={styles.filtersButton}>
                <label htmlFor="is_read">Oui</label>
                <input
                  name="is_read"
                  type="radio"
                  value="1"
                  defaultChecked={filters.is_read && filters.is_read === "1"}
                />
              </div>
              <div className={styles.filtersButton}>
                <label htmlFor="is_read">Non</label>
                <input
                  name="is_read"
                  type="radio"
                  value="0"
                  defaultChecked={filters.is_read && filters.is_read === "0"}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    // TODO Mettre en place les boutons tri et filtres
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
          <img src={filterButton} alt="filtre" />
        </button>
      </div>
      {itemsToDisplay &&
        itemsToDisplay
          .filter((item) => {
            return (
              Object.keys(filters).length === 0 ||
              ((!filters.owned || parseInt(filters.owned, 10) === item.owned) &&
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
  );
}

export default List;

List.propTypes = {
  part: PropTypes.string.isRequired,
};
