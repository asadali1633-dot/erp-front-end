import React from 'react'
import QuotationLivePreview from '../QuotationLivePreview';

function Download() {
    const handleDownload = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${baseUrl.baseUrl}/api/quotation/${quoteId}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            const json = await res.json();
            if (json.success) {
                const blob = await pdf(<QuotationLivePreview data={json.data} />).toBlob();
                // ... download
            }
        } catch (err) {
            message.error('Failed');
        } finally {
            setLoading(false);
        }
    };
    return (
        <></>
    )
}

export default Download