import { useState, useEffect, useContext } from 'react';
import { CreditCard, ChevronLeft, Info, ChevronDown } from 'lucide-react';
import { CartContext } from '../../context/CartContext'; 
import './Payment.css';
import { useNavigate } from 'react-router-dom';

export default function PaymentForm() {
  const { cart, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate()
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [cardType, setCardType] = useState(null);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return value;
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryDateChange = (e) => {
    if (e.target.value.length <= 5) {
      setExpiryDate(formatExpiryDate(e.target.value));
    }
  };

  const handleSecurityCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setSecurityCode(value);
    }
  };

  useEffect(() => {
    const cleanNumber = cardNumber.replace(/\s+/g, '');
    if (cleanNumber.length > 2) {
      if (/^4/.test(cleanNumber)) setCardType('visa');
      else if (/^5[1-5]/.test(cleanNumber) || /^2[2-7]/.test(cleanNumber)) setCardType('mastercard');
      else if (/^3[47]/.test(cleanNumber)) setCardType('amex');
      else if (/^(6011|65|64[4-9]|622)/.test(cleanNumber)) setCardType('discover');
      else if (/^35/.test(cleanNumber)) setCardType('jcb');
      else if (/^9860/.test(cleanNumber)) setCardType('balance');
      else if (/^(30|36|38|39)/.test(cleanNumber)) setCardType('diners');
      else setCardType(null);
    } else {
      setCardType(null);
    }
  }, [cardNumber]);

  const CardLogo = ({ type }) => {
    switch (type) {
      case 'visa':
        return <div className="card-logo visa">VISA</div>;
      case 'mastercard':
        return (
          <div className="card-logo mastercard">
            <div className="circle red"></div>
            <div className="circle yellow"></div>
          </div>
        );
      case 'amex':
        return <div className="card-logo amex">AmEx</div>;
      case 'discover':
        return <div className="card-logo discover">Disc</div>;
      case 'jcb':
        return <div className="card-logo jcb">JCB</div>;
      case 'diners':
        return <div className="card-logo diners">D</div>;
      case 'balance':
        return <div className="card-logo balance">BAL</div>;
      default:
        return <CreditCard size={18} className="icon-gray" />;
    }
  };

  return (
    <div className="wreeep">
      <div className="continer">
        <div className="flexcont">
          <div className="let">
            <button className="back-button">
              <ChevronLeft size={18} />
              <span>Back to Home</span>
            </button>

            <div className="form-container">
              <div className="secure-message">
                <CreditCard size={20} />
                <p>All transactions are secured, processed and authorized by external payment providers</p>
              </div>

              <div className="formp">
                <label>Card number</label>
                <div className="input-with-icon">
                  <input
                    type="text"
                    placeholder="XXXX XXXX XXXX XXXX"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    maxLength={19}
                  />
                  <div className="icon-container">
                    <CardLogo type={cardType} />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="half">
                  <label>Expiration date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    maxLength={5}
                  />
                </div>

                <div className="half">
                  <label>
                    Security code <Info size={16} />
                  </label>
                  <input
                    type="text"
                    value={securityCode}
                    onChange={handleSecurityCodeChange}
                    maxLength={4}
                  />
                </div>
              </div>

              <div className="formp">
                <label>Cardholder name</label>
                <input
                  type="text"
                  placeholder=""
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                />
                <p className="hint">A full name, as it appears on the card</p>
              </div>

            <button onClick={() => navigate("/")} className="confirm-button">
  Confirm
</button>
            </div>
          </div>

          <div className="rght">
            <div className="subtotal">
              <button onClick={() => setIsExpanded(!isExpanded)}>
                <span>Subtotal ({cart.length} item{cart.length !== 1 ? 's' : ''})</span>
                <ChevronDown size={18} className={isExpanded ? 'rotate' : ''} />
              </button>

              <div className={`details ${isExpanded ? 'open' : ''}`}>
                {cart.map(item => (
                  <div key={item._id}>
                    <p>{item.name} x{item.quantity}</p>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="prc">
                <span>Subtotal</span>
                <span>$ {getCartTotal().toFixed(2)}</span>
              </div>
            </div>

            <div className="fee">
              <span>Payment fee <Info size={14} /></span>
              <span>$ 0.22</span>
            </div>

            <div className="total">
              <span>Total</span>
              <span>$ {(getCartTotal() + 0.22).toFixed(2)}</span>
            </div>

            <div className="card-options">
              <p>You can use different cards, depending on your region.</p>
              <div className="cards">
                {['visa', 'mastercard', 'amex', 'discover', 'jcb', 'balance'].map(type => (
                  <div
                    key={type}
                    className={`card ${cardType === type ? 'active' : ''}`}
                  >
                    <CardLogo type={type} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}