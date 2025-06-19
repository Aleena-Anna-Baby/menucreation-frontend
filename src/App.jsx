import React, { useState, useEffect } from 'react';
import './App.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import axios from "axios";
import { MdOutlinePhone } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { SlSocialFacebook } from "react-icons/sl";
import { CiTwitter } from "react-icons/ci";
import { PiYoutubeLogoLight } from "react-icons/pi";
import { FaInstagram } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menus, setMenus] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    image1: "",
    image2: "",
  });
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
const [showAddMenuItemForm, setShowAddMenuItemForm] = useState(false);
const [newMenuItem, setNewMenuItem] = useState({
  name: "",
  price: "",
  description: ""
});

  useEffect(() => {
axios.get("https://menucreation-backend.onrender.com/api/menu/menus")
      .then(res => setMenus(res.data))
      .catch(err => console.error(err));
  }, []);


  const handleAddMenu = () => {
    if (!newMenu.name || !newMenu.description) {
      alert("Please fill in all required fields.");
      return;
    }

    axios
      .post("https://menucreation-backend.onrender.com/api/menu/menus", newMenu)
      .then((res) => {
        setMenus([...menus, res.data]);
        setShowAddForm(false);
        setNewMenu({ name: "", description: "", image1: "", image2: "" });
      })
      .catch((err) => console.error(err));
  };

const handleAddMenuItem = () => {
  if (!newMenuItem.name || !newMenuItem.price || !newMenuItem.description) {
    alert("Please fill in all fields.");
    return;
  }

axios.post(`https://menucreation-backend.onrender.com/api/menu/menus/${selectedMenu._id}/items`, newMenuItem)
    .then((res) => {
      setMenuItems([...menuItems, res.data]);
      setShowAddMenuItemForm(false);
      setNewMenuItem({ name: "", price: "", description: "" });
    })
    .catch((err) => console.error("Failed to add menu item:", err));
};


  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  setMenuItems([]); 
  console.log("Selected Menu:", menu);

axios.get(`https://menucreation-backend.onrender.com/api/menu/menus/${menu._id}/items`)
      .then(res => setMenuItems(res.data))
      .catch(err => console.error("Error fetching menu items:", err));
  };




  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo">
          <img src="/Logo.png" alt="Logo" className="logo" />
          <div className="logo-name">
            <div className="line-one">
              <span className="deep">DEEP</span>
              <span className="net"> NET</span>
            </div>
            <div className="line-two">
              <span className="soft">SOFT</span>
            </div>
          </div>


        </div>

        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <a href="#home">HOME</a>
          <a href="#menu">MENU</a>
          <a href="#reservation">MAKE A RESERVATION</a>
          <a href="#contact">CONTACT US</a>
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </nav>

      <section
        className="menu-banner"
        style={{
          backgroundImage: `url(${"/menu-image.jpg"})`,
        }}
      >
        <div className="banner-content">
          <h1 className="menu-title">MENU</h1>
          <p className="menu-description">
            Please take a look at our menu featuring food, drinks, and brunch. If you'd like to place an order, use the "Order Online" button located below the menu.          </p>
        </div>
      </section>


      <div className="menu-grid">
        {menus.map(menu => (
          <div className={`menu-wrapper ${selectedMenu?._id === menu._id ? "selected" : ""}`} key={menu._id} onClick={() => handleMenuClick(menu)}
          >
            <div className="menu-card">
              <h4>{menu.name}</h4>
            </div>
            <div className="menu-description-hover">{menu.description}</div>
          </div>
        ))}

        <div className="menu-card add-menu-card" onClick={() => setShowAddForm(true)}>
          <h3 >+</h3>
        </div>


        {showAddForm && (
          <div className="add-form-overlay">
            <div className="add-form">
              <h2>Add New Menu</h2>

              <input
                type="text"
                placeholder="Menu Name"
                value={newMenu.name}
                onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
              />
              <textarea
                placeholder="Description"
                value={newMenu.description}
                onChange={(e) => setNewMenu({ ...newMenu, description: e.target.value })}
              />
              <input
                type="text"
                placeholder="Image URL 1"
                value={newMenu.image1}
                onChange={(e) => setNewMenu({ ...newMenu, image1: e.target.value })}
              />
              <input
                type="text"
                placeholder="Image URL 2"
                value={newMenu.image2}
                onChange={(e) => setNewMenu({ ...newMenu, image2: e.target.value })}
              />
              <div className="form-buttons">
                <button onClick={handleAddMenu}>Add</button>
                <button onClick={() => setShowAddForm(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>

{!selectedMenu && (
  <div className="menu-instruction">
    <p>Please select a menu category to view its items.</p>
  </div>
)}




{selectedMenu && (
  <section className="menu-item-section">
    <div className="menu-item-bg">
      <div className="menu-item-box">

<button
  className="add-menu-item-button"
  onClick={() => setShowAddMenuItemForm(true)}
>
  + 
</button>

{showAddMenuItemForm && (
  <div className="add-form-overlay">
    <div className="add-form">
      <h2>Add Menu Item</h2>
      <input
        type="text"
        placeholder="Item Name"
        value={newMenuItem.name}
        onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newMenuItem.price}
        onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={newMenuItem.description}
        onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
      />
      <div className="form-buttons">
        <button onClick={handleAddMenuItem}>Add</button>
        <button onClick={() => setShowAddMenuItemForm(false)}>Cancel</button>
      </div>
    </div>
  </div>
)}

 <img src={selectedMenu.image1} alt="Image 1" className="corner-image top-left" />
  <img src={selectedMenu.image2} alt="Image 2" className="corner-image bottom-right" />        <h2 className="menu-item-title">{selectedMenu.name}</h2>
        <ul className="menu-items-list">
          {menuItems.map(item => (
            <li key={item._id}>
              <strong>{item.name}</strong>   <span className="dots">................................</span>
 ₹{item.price}
              <br />
              <span className="menu-item-desc">{item.description}</span>
            </li>
          ))}
        </ul>
      </div>

      
    </div>
  </section>
)}

<footer className="footer-section">
  <div className="footer-box connect-box">
    <h4>CONNECT WITH US</h4>
    <p><i className="phone"></i> <MdOutlinePhone className='icon'/>
+91 9567843340</p>
    <p><i className="mail"></i><CiMail className='icon'/>
 info@deepnetsoft.com</p>
  </div>

<div className="footer-box logo-box">
  <img src="/Logo.png" alt="Logo" className="footer-logo-img" />
  
  <div className="footer-logo-name">
    <span className="deep">DEEP</span>
    <span className="net"> NET</span>
    <span className="soft"> SOFT</span>
  </div>
  
  <div className="social-icons">
    <i className="fab fa-facebook-f"><SlSocialFacebook />
</i>
    <i className="fab fa-twitter"><CiTwitter />
</i>
    <i className="fab fa-youtube"><PiYoutubeLogoLight />
</i>
    <i className="fab fa-instagram"><FaInstagram />
</i>
  </div>
</div>


  <div className="footer-box address-box">
    <h4>FIND US</h4>
    <p><CiLocationOn />
First floor, Geo infopark, Infopark EXPY, Kakkanad</p>
  </div>
</footer>



<div className="footer-bottom-bar">
  <p className="copyright">
    © 2024 Deepnetsoft Solutions. All rights reserved.
  </p>
  <div className="footer-links">
    <a href="#terms">Terms & Conditions</a>
    <a href="#privacy">Privacy Policy</a>
  </div>
</div>



    </div>
  );
}

export default App;
