import { Document, Page, Text, View, Image, StyleSheet, Font } from '@react-pdf/renderer';
import regularFont from '../../../assests/font/Roboto.ttf'
import boldFont from '../../../assests/font/Roboto.ttf';
import style from './Forms/form.module.css'
import baseUrl from '../../../../src/config.json'
import { Button } from '../../../Components/Button/Button';



Font.register({
    family: 'Roboto',
    fonts: [
        { src: regularFont, fontWeight: 'normal' },
        { src: boldFont, fontWeight: 'bold' },

    ]
});


const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontFamily: 'Roboto',
    },
    richText: {
        marginTop: 20,
        fontSize: 10,
        lineHeight: 1.4,
    },
    headerRow: {
        flexDirection: 'row',
        marginBottom: 15,
        paddingBottom: 5,
    },
    headerRow2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        marginTop:50,
        paddingBottom: 5,
    },
    headerRow3: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        marginTop: 50,
        paddingBottom: 5,
    },
    col33: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "flex-start"
    },
    headertxt: {
        fontSize: 9,
        textAlign: "left",
        color: "#6a6a6ace",
        marginBottom: 5,
    },
    title: {
        fontSize: 9.02,
        textAlign: "left",
        color: "black",
        fontWeight: "bold",
        marginBottom: 5
    },
    textLeft: {
        textAlign: 'left',
        flexDirection: "column"
    },
    textCenter: {
        textAlign: 'center',
    },
    textRight: {
        textAlign: 'right',
    },
    logo: {
        width: 140,
        objectFit: 'contain',
    },
    col50: {
        width: '50%',
    },
    col50Right: {
        width: '50%',
        alignItems: 'flex-end',
    },

    quoteBox: {
        width: '50%',
        backgroundColor: '#3792B2',
        padding: 10,
        borderRadius: 10,
    },
    grandTotalBox: {
        width: '80%',
        padding: 10,
        borderRadius: 10,
    },
    addressBox: {
        width: '80%',
        alignSelf: 'flex-end',
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    colorWhite: { color: "white" },
    table: {
        width: '100%',
        marginTop: 20,
    },

    tableRowHeader: {
        flexDirection: 'row',
        backgroundColor: '#7484E1',
        paddingVertical: 6,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,

    },

    tableRow: {
        flexDirection: 'row',
        paddingVertical: 6,
        backgroundColor: "#f5f5f5bf",
    },

    colDesc: {
        width: '40%',
        fontSize: 10,
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 5,
    },

    colCost: {
        width: '20%',
        fontSize: 10,
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 5,
    },

    colQty: {
        width: '20%',
        fontSize: 10,
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 5,
    },

    colTotal: {
        width: '20%',
        fontSize: 10,
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 5,
    },
    termText: {
        fontSize: 9,
        color: "black",
        marginBottom: 5
    },
    footer: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 8,
        color: '#666',
    },
});


const QuotationLivePreview = ({ data }) => {
    const {
        quotation_number, quote_date, valid_until,
        customer_name, customer_contact, customer_email, customer_phone, billing_address,
        items, currency,
        company_name, company_logo, company_address, company_phone, company_whatsapp,
        company_email, company_website, ntn_vat, business_id,
        ntn, strn, terms_conditions
    } = data;


    const ITEMS_PER_PAGE = 15;
    const batches = [];
    for (let i = 0; i < items.length; i += ITEMS_PER_PAGE) {
        batches.push(items.slice(i, i + ITEMS_PER_PAGE));
    }
    const renderQuillContent = (html = '') => {
        if (!html) return null;

        // Replace &nbsp; and <br>
        html = html.replace(/&nbsp;/g, ' ').replace(/<br\s*\/?>/g, '\n');

        // Split by paragraphs and list items
        const blocks = html.split(/<\/p>|<\/li>|<\/ul>|<\/ol>/).filter(b => b.trim() !== '');

        return blocks.map((block, idx) => {
            let content = block.replace(/<[^>]+>/g, ''); // Remove remaining tags

            // Detect inline styles
            const isBold = /<b>|<strong>/.test(block);
            const isItalic = /<i>|<em>/.test(block);
            const isUnderline = /<u>/.test(block);
            const isStrike = /<s>/.test(block);
            const isBullet = /<li>/.test(block);

            return (
                <Text
                    key={idx}
                    style={{
                        fontSize: 10,
                        marginBottom: 4,
                        lineHeight: 1.5,
                        fontWeight: isBold ? 'bold' : 'normal',
                        fontStyle: isItalic ? 'italic' : 'normal',
                        textDecoration: isUnderline
                            ? 'underline'
                            : isStrike
                                ? 'line-through'
                                : 'none',
                        marginLeft: isBullet ? 10 : 0,
                    }}
                >
                    {isBullet ? '• ' : ''}
                    {content.trim()}
                </Text>
            );
        });
    };

    let subtotal = 0;
    let totalDiscount = 0;
    let totalTax = 0;

    items.forEach(item => {
        const qty = parseFloat(item.quantity) || 0;
        const price = parseFloat(item.Unit_Price) || 0;
        const discountPercent = parseFloat(item.discount_percent) || 0;
        const taxRate = parseFloat(item.tax_rate) || 0;

        const itemSubtotal = qty * price;
        const discountAmount = itemSubtotal * (discountPercent / 100);
        const taxAmount = itemSubtotal * (taxRate / 100);

        subtotal += itemSubtotal;
        totalDiscount += discountAmount;
        totalTax += taxAmount;
    });

    const grandTotal = subtotal - totalDiscount + totalTax;
    const discountPercentOverall = subtotal ? (totalDiscount / subtotal) * 100 : 0;
    const taxPercentOverall = subtotal ? (totalTax / subtotal) * 100 : 0;
    const formatNumber = (value) => {
        if (value === undefined || value === null || value === '') return '-';
        const num = parseFloat(value);
        if (isNaN(num)) return '-';
        if (Number.isInteger(num)) {
            return num.toLocaleString('en-PK');
        }
        return num.toLocaleString('en-PK', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
    };

    const hasDiscount = items.some(item =>
        item.discount_percent && parseFloat(item.discount_percent) !== 0
    );

    const hasTaxRate = items.some(item =>
        item.tax_rate && parseFloat(item.tax_rate) !== 0
    );

    const hasTaxAmount = items.some(item =>
        item.tax_amount && parseFloat(item.tax_amount) !== 0
    );
    const totalAmount = items.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0);

    return (
        <>
            <Document>
                {batches.map((batch, pageIndex) => (
                    <Page size="A4" style={styles.page}>
                        <View style={{ flex: 1 }}>
                            {pageIndex === 0 && (
                                <>
                                    <View style={styles.headerRow}>
                                        <View style={styles.col33}>
                                            <Image style={styles.logo} src={`${baseUrl.baseUrl}${company_logo}`} />
                                        </View>
                                        <View style={styles.col33}>
                                            <View>
                                                {company_name ? <Text style={styles.headertxt}>Company: {company_name}</Text> : null}
                                                {ntn_vat ? <Text style={styles.headertxt}>NTN: {ntn_vat}</Text> : null}
                                                {company_website ? <Text style={styles.headertxt}>Web: {company_website}</Text> : null}
                                                {company_email ? <Text style={styles.headertxt}>Email: {company_email}</Text> : null}
                                                {company_phone ? <Text style={styles.headertxt}>Phone: {company_phone}</Text> : null}
                                            </View>
                                        </View>
                                        <View style={styles.col33}>
                                            <View style={styles.addressBox}>
                                                <Text style={styles.textRight}>
                                                    <Text style={[styles.headertxt, { lineHeight: 1.5 }]}>{company_address ? company_address : null}</Text>
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={[styles.textCenter]}>Quotation</Text>
                                    </View>
                                    <View style={styles.headerRow2}>
                                        <View style={styles.col50}>
                                            {
                                                customer_name || customer_phone || ntn || strn || customer_email ?
                                                    <Text style={styles.title}>Quote issued to:</Text> : null
                                            }
                                            {customer_name ? <Text style={[styles.termText]}>Name: {customer_name}</Text> : null}
                                            {customer_phone ? <Text style={[styles.termText]}>Phone: {customer_phone}</Text> : null}
                                            {ntn ? <Text style={[styles.termText]}>NTN: {ntn}</Text> : null}
                                            {strn ? <Text style={[styles.termText]}>STRN: {strn}</Text> : null}
                                            {customer_email ? <Text style={[styles.termText]}>Email: {customer_email}</Text> : null}
                                        </View>
                                        <View style={styles.col50Right}>
                                            <View style={styles.quoteBox}>
                                                {
                                                    quotation_number ?
                                                        <View style={styles.rowBetween}>
                                                            <Text style={[styles.headertxt, styles.colorWhite]}>Quote Number:</Text>
                                                            <Text style={[styles.headertxt, styles.colorWhite]}>{quotation_number}</Text>
                                                        </View> : null
                                                }
                                                {
                                                    quote_date ?
                                                        <View style={styles.rowBetween}>
                                                            <Text style={[styles.headertxt, styles.colorWhite]}>Quote Date:</Text>
                                                            <Text style={[styles.headertxt, styles.colorWhite]}>{quote_date}</Text>
                                                        </View> : null
                                                }
                                                {
                                                    valid_until ?
                                                        <View style={styles.rowBetween}>
                                                            <Text style={[styles.headertxt, styles.colorWhite]}>Valid Until:</Text>
                                                            <Text style={[styles.headertxt, styles.colorWhite]}>{valid_until}</Text>
                                                        </View> : null
                                                }
                                                {
                                                    grandTotal ?
                                                        <View style={styles.rowBetween}>
                                                            <Text style={[styles.headertxt, styles.colorWhite]}>Total:</Text>
                                                            <Text style={[styles.headertxt, styles.colorWhite]}>Rs {formatNumber(grandTotal)}</Text>
                                                        </View> : null
                                                }
                                            </View>
                                        </View>
                                    </View>
                                </>
                            )}


                            <View style={styles.table}>
                                <View style={styles.tableRowHeader}>
                                    <Text style={[styles.colDesc, styles.colorWhite]}>Item Description</Text>
                                    <Text style={[styles.colQty, styles.colorWhite]}>Quantity</Text>
                                    <Text style={[styles.colCost, styles.colorWhite]}>Unit Cost</Text>
                                    {hasDiscount && <Text style={[styles.colCost, styles.colorWhite]}>Discount %</Text>}
                                    {hasTaxRate && <Text style={[styles.colCost, styles.colorWhite]}>Tax %</Text>}
                                    {hasTaxAmount && <Text style={[styles.colCost, styles.colorWhite]}>Tax</Text>}
                                    <Text style={[styles.colTotal, styles.colorWhite]}>Line Total</Text>
                                </View>

                                {batch.map((item, idx) => (
                                    <View style={styles.tableRow} key={idx}>
                                        <Text style={styles.colDesc}>{item.description}</Text>
                                        <Text style={styles.colQty}>{item.quantity}</Text>
                                        <Text style={styles.colCost}>{formatNumber(item.Unit_Price)}</Text>
                                        {hasDiscount && (
                                            <Text style={styles.colCost}>
                                                {item.discount_percent ? item.discount_percent : null}
                                            </Text>
                                        )}
                                        {hasTaxRate && (
                                            <Text style={styles.colCost}>
                                                {item.tax_rate ? item.tax_rate : null}
                                            </Text>
                                        )}
                                        {hasTaxAmount && (
                                            <Text style={styles.colCost}>
                                                {formatNumber(item.tax_amount)}
                                            </Text>
                                        )}
                                        <Text style={styles.colTotal}>{item?.total}</Text>
                                    </View>
                                ))}
                            </View>

                            {pageIndex === batches.length - 1 && (
                                <>
                                    <View style={styles.headerRow3}>
                                        <View style={styles.col50}>
                                            {/* {
                                                terms_conditions && (
                                                    <>
                                                        <Text style={styles.title}>Quote Terms:</Text>
                                                        <Text style={[styles.termText]}>Taxes: {"All taxes are included."}</Text>
                                                    </>
                                                )
                                            } */}
                                                    
                                        </View>
                                        <View style={styles.col50Right}>
                                            <View style={styles.grandTotalBox}>
                                                <View style={styles.rowBetween}>
                                                    <Text style={[styles.termText]}>Subtotal:</Text>
                                                    <Text style={[styles.termText]}>Rs {formatNumber(subtotal)}</Text>
                                                </View>
                                                {
                                                    hasDiscount && (
                                                        <View style={styles.rowBetween}>
                                                            <Text style={[styles.termText]}>Discount: {formatNumber(discountPercentOverall.toFixed(2))}%</Text>
                                                            <Text style={[styles.termText]}>Rs {formatNumber(totalDiscount)}</Text>
                                                        </View>
                                                    )
                                                    
                                                }
                                               
                                               {
                                                    hasTaxRate && (
                                                        <View style={styles.rowBetween}>
                                                            <Text style={[styles.termText]}>Tax: {formatNumber(taxPercentOverall.toFixed(2))}%</Text>
                                                            <Text style={[styles.termText]}>Rs {formatNumber(totalTax)}</Text>
                                                        </View>
                                                    )
                                               }
                                                
                                                <View style={styles.rowBetween}>
                                                    <Text style={[styles.termText]}>Total:</Text>
                                                    <Text style={[styles.termText]}>Rs {formatNumber(grandTotal)}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    {
                                        terms_conditions && (<>
                                            <View style={styles.richText}>
                                                <View>
                                                    <Text style={styles.title}>Terms & Conditions:</Text>
                                                    <View>
                                                        {renderQuillContent(terms_conditions)}
                                                    </View>
                                                </View>
                                            </View>
                                        </>)
                                    }
                                </>
                            )}
                        </View>
                        <Text style={styles.footer}>Computer-generated quotation. No signature required.</Text>
                    </Page>
                ))}
            </Document>
        </>

    );
};

export default QuotationLivePreview;