import React from 'react';
import style from './Quotation.module.css'

const QuotationPrintView = React.forwardRef(({ data }, ref) => {
    const {
        quotation_number,
        quote_date,
        valid_until,
        customer_name,
        customer_contact,
        customer_email,
        customer_phone,
        billing_address,
        items,
        currency,
        payment_terms,
    } = data;

    const totalAmount = items.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0);

    return (
        <div ref={ref} style={{ padding: '20px', fontFamily: 'Arial, sans-serif', fontSize: '12px' }}>
            {/* Header */}
            <div className={style.headerPdf}>
                <div>
                    <h5>Logo</h5>
                </div>
                <div>logo</div>
                <div>logo</div>
            </div>

            {/* Customer Details */}
            {/* <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
                <h3>Bill To:</h3>
                <div><strong>{customer_name}</strong></div>
                <div>{customer_contact}</div>
                <div>{customer_email}</div>
                <div>{customer_phone}</div>
                <div>{billing_address}</div>
            </div> */}

            {/* Items Table */}
            {/* <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f0f0f0', borderBottom: '1px solid #ddd' }}>
                        <th style={{ textAlign: 'left', padding: '8px' }}>Description</th>
                        <th style={{ textAlign: 'right', padding: '8px' }}>Qty</th>
                        <th style={{ textAlign: 'right', padding: '8px' }}>Unit Price</th>
                        <th style={{ textAlign: 'right', padding: '8px' }}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '8px' }}>{item.description}</td>
                            <td style={{ textAlign: 'right', padding: '8px' }}>{item.quantity}</td>
                            <td style={{ textAlign: 'right', padding: '8px' }}>{currency} {parseFloat(item.Unit_Price || 0).toFixed(2)}</td>
                            <td style={{ textAlign: 'right', padding: '8px' }}>{currency} {parseFloat(item.total || 0).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}

            {/* Totals */}
            {/* <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <div style={{ width: '250px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                        <strong>Total:</strong>
                        <span>{currency} {totalAmount.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderTop: '1px solid #ccc' }}>
                        <strong>Payment Terms:</strong>
                        <span>{payment_terms}</span>
                    </div>
                </div>
            </div> */}

            {/* Footer */}
            {/* <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '10px', color: '#666' }}>
                This is a computer-generated quotation. No signature required.
            </div> */}
        </div>
    );
});

export default QuotationPrintView;