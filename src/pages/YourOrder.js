import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import get from 'lodash/get';
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from 'moment';
import { FaEye } from "react-icons/fa";

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Box, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
    MDBCol,
    MDBIcon,
    MDBRow,
} from "mdb-react-ui-kit";
import oops from "../images/oops.png";
import logoMini from "../images/cougar-logo.png";
import { getInvoiceSelector, getInvoiceDetailSelector, getPrISelector } from "../store/shop_order/selectors";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    borderRadius: "20px",
    borderTop: "5px solid #f37a27",
    borderBottom: "5px solid #f37a27",
    p: 4,
};



const columns = [
    {
        id: 'id',
        label: 'Order No.',
        align: 'left',
        minWidth: 100
    },
    {
        id: 'userPaymentMethod.paymentType.value',
        label: 'Payment Method',
        minWidth: 100,
        align: 'left',
    },
    {
        id: 'deliveryMethod.name',
        label: 'Delivery Method',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'orderTotal',
        label: 'Total',
        minWidth: 170,
        align: 'right',
        format: (value) => `$${value.toFixed(2)}`
    },
    {
        id: 'orderStatus',
        label: 'Status',
        minWidth: 200,
        align: 'center',
        format: (value) => {
            if (value === 0) {
                return `PROCESSED`;
            } else
                if (value === 1) {
                    return `ORDER SHIPPED`;
                } else
                    if (value === 2) {
                        return `ORDER EN ROUTE`
                    } else
                        if (value === 3) {
                            return `ORDER ARRIVED`
                        } else if (value === 4) {
                            return `CANCELED`
                        }

        }
    },
    {
        id: 'detail',
        label: 'Show detail',
        minWidth: 200,
        align: 'center',
    },
];


const YourOrder = () => {
    const [showCloseButton, setShowCloseButton] = useState(true);
    const [invoiceSelected, setInvoiceSelected] = useState();
    const [invoiceDetailsToShow, setInvoiceDetailsToShow] = useState();
    const [openInvoiceDetails, setOpenInvoiceDetails] = useState(false);

    const handleClose = () => {
        setShowCloseButton(false);
        setOpenInvoiceDetails(false);
        setInvoiceSelected(null);
    };
    const handleInvoiceDetailOpen = (id) => {
        const temp = invoices.find(item => item.id === id);
        setOpenInvoiceDetails(true);
        setInvoiceSelected(temp);
        setShowCloseButton(true);
        console.log(temp);
        const resultToShow = invoiceDetails
            .filter(({ shopOrder }) => shopOrder.id === id)
            .map(({ qty, price, productItem }) => {
                const { id: productItemId, product: { name }, image, sku } = productItem;
                return { productItemId, name, qty, price, image, sku };
            });
        setInvoiceDetailsToShow(resultToShow);
    };

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const invoiceDetails = useSelector(getInvoiceDetailSelector);
    const invoices = useSelector(getInvoiceSelector).filter(invoice => invoice.orderStatus !== null);
    const productVariants = useSelector(getPrISelector);
    console.log(invoices);
    return (
        <>
            <Meta title={"YourOrder"} />
            <BreadCrumb title="Your Order" />
            <Container class1="yourorder-wrapper home-wrapper-2 pt-3 pb-5">
                <div className="row">
                    <div className="h3 text-center">
                        ORDER HISTORY
                    </div>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        {invoices.length ?
                            (<TableContainer sx={{ maxHeight: 440 }}>
                                <Table className="table-invoice-st" stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    className="header-comlumn-st"
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth, backgroundColor: "#232F3E" }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {invoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((invoice) => {
                                            return (
                                                <TableRow key={invoice.id}>
                                                    {columns.map((column) => {
                                                        const value = get(invoice, column.id);
                                                        const defaultValue = column.id === 'userPaymentMethod.paymentType.value' && !value ? 'Cash On Delivery' : column.id === 'deliveryMethod.name' && !value ? 'Normal' : '';

                                                        return (
                                                            <TableCell key={column.id} align={column.align} className={`status-${value}`}>
                                                                {column.format && typeof value === 'number'
                                                                    ? column.format(value)
                                                                    : column.id === 'detail'
                                                                        ? <button className="button-16" style={{ fontSize: "20px" }} onClick={() => handleInvoiceDetailOpen(invoice.id)}><FaEye /></button>
                                                                        : value ?? defaultValue}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>) : (<div className="row">
                                <div className="text-center">
                                    <img                                        
                                        src={oops}
                                        width="300px"
                                        style={{ marginTop: "15px"}}
                                        alt="Noob"
                                    />
                                    <h3>You don't have any orders yet.</h3>
                                    <Link to="/product" className="button-92">Shop now?</Link>
                                </div>
                            </div>)}

                        {invoiceSelected && (
                            <Modal
                                keepMounted
                                open={openInvoiceDetails}
                                onClose={handleClose}
                                aria-labelledby="keep-mounted-modal-title"
                                aria-describedby="keep-mounted-modal-description"
                            >
                                <Box sx={style}>
                                    {showCloseButton && (
                                        <IconButton
                                            aria-label="close"
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                m: 1,
                                                color: 'inherit',
                                            }}
                                            onClick={handleClose}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    )}
                                    <div className="row">
                                        <div className="col-5">
                                            <span className="h4" style={{ color: "#f37a27" }}>Purchase Reciept</span>

                                            <span className="position-relative">
                                                <img
                                                    className="position-absolute"
                                                    src={logoMini}
                                                    width="100px"
                                                    style={{ marginTop: "-15px", marginLeft: "45px" }}
                                                    alt="main banner"
                                                />
                                            </span>
                                            <table className="table">
                                                <tbody>
                                                    <tr className="small text-muted">
                                                        <th style={{ width: "100px" }} scope="row">Order No.</th>
                                                        <td>{invoiceSelected.id}</td>
                                                    </tr>
                                                    <tr className="small text-muted">
                                                        <th scope="row">Create Time</th>
                                                        <td>{moment(invoiceSelected.createDate).format("DD/MM/YYYY HH:mm:ss")}</td>
                                                    </tr>
                                                    <tr className="small text-muted">
                                                        <th scope="row">Payment M.</th>
                                                        <td>{invoiceSelected.userPaymentMethod === null ? 'Cash On Delivery' : invoiceSelected.userPaymentMethod.paymentType.value}</td>
                                                    </tr>
                                                    <tr className="small text-muted">
                                                        <th scope="row">Delivery M.</th>
                                                        <td>{invoiceSelected.deliveryMethod.name}</td>
                                                    </tr>

                                                    <tr className="small text-muted">
                                                        <th scope="row">Address</th>
                                                        <td>{invoiceSelected.address.unitNumber} ,{invoiceSelected.address.addressLine}, {invoiceSelected.address.district}, {invoiceSelected.address.province}, {invoiceSelected.address.countryName}.</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="col-7">
                                            <div
                                                className="mx-n5 px-3 py-3 mt-1 scrollable"
                                                style={{ backgroundColor: "#f2f2f2" }}
                                            >
                                                <MDBRow>
                                                    <MDBCol md="1" lg="1">
                                                        <span className="fw-bold">No.</span>
                                                    </MDBCol>
                                                    <MDBCol md="6" lg="7">
                                                        <span className="fw-bold">Product Name</span>
                                                    </MDBCol>
                                                    <MDBCol md="5" lg="4">
                                                        <div className="text-center"><span className="fw-bold">Price</span></div>
                                                    </MDBCol>
                                                </MDBRow>

                                                {invoiceDetailsToShow.map(
                                                    (item, index) => {
                                                        const productVariant = productVariants.find(variant => variant.id === item.productItemId);
                                                        const color = productVariant ? productVariant.color : '';
                                                        const size = productVariant ? productVariant.size : '';
                                                        return (<MDBRow key={item.productItemId}>
                                                            <MDBCol md="1" lg="1">
                                                                <span className="fw-bold">{index + 1}</span>
                                                            </MDBCol>
                                                            <MDBCol md="6" lg="7">
                                                                <p>{item.name} <br /> (<span className="small fst-italic">Color: {color}, Size: {size}</span>)</p>
                                                            </MDBCol>
                                                            <MDBCol md="5" lg="4">
                                                                <p>
                                                                    {item.qty} &emsp;x&emsp; {item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                                                    <br />
                                                                    <span className="row">
                                                                        <span className="text-end fst-italic small ">
                                                                            ps: <span className="fw-bold">{(item.qty * item.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                                                                        </span>
                                                                    </span>
                                                                </p>

                                                            </MDBCol>
                                                        </MDBRow>)
                                                    })
                                                }
                                                <MDBRow>
                                                    <MDBCol md="8" lg="9">
                                                        <p className="mb-0">Shipping fee</p>
                                                    </MDBCol>
                                                    <MDBCol md="4" lg="3">
                                                        <p className="mb-0  text-end fw-bold">{invoiceSelected.deliveryMethod.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                                                    </MDBCol>
                                                </MDBRow>
                                            </div>
                                            <MDBRow className="my-4">
                                                <MDBCol md="4" className="offset-md-6 col-lg-5 offset-lg-9">
                                                    <p
                                                        className="fw-bold mb-0 te"
                                                        style={{ color: "#f37a27" }}
                                                    >
                                                        Total: &ensp;{invoiceSelected.orderTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                                    </p>
                                                </MDBCol>
                                            </MDBRow>
                                        </div>
                                    </div>

                                    <p
                                        className="lead text-center fw-bold mb-2 pb-2"
                                        style={{ color: "#f37a27" }}
                                    >
                                        TRACKING ORDER
                                    </p>

                                    <ul
                                        id="progressbar-2"
                                        className="d-flex justify-content-between mx-0 mt-0 mb-2 px-0 pt-0 pb-2"
                                    >
                                        <li className={`step0 ${invoiceSelected.orderStatus >= 0 ? 'active' : ''} text-center`} id="step0"></li>
                                        <li className={`step0 ${invoiceSelected.orderStatus >= 1 ? 'active' : ''} text-center`} id="step1"></li>
                                        <li className={`step0 ${invoiceSelected.orderStatus >= 2 ? 'active' : ''} text-center`} id="step2"></li>
                                        <li className={`step0 ${invoiceSelected.orderStatus >= 3 ? 'active' : ''} text-muted text-end`} id="step3"></li>
                                    </ul>

                                    <div className="d-flex justify-content-between">
                                        <div className="d-lg-flex align-items-center">
                                            <MDBIcon fas icon="clipboard-list me-lg-4 mb-3 mb-lg-0" size="3x" />
                                            <div>
                                                <p className="fw-bold mb-1">Order</p>
                                                <p className="fw-bold mb-0">Processed</p>
                                            </div>
                                        </div>
                                        <div className="d-lg-flex align-items-center">
                                            <MDBIcon fas icon="box-open me-lg-4 mb-3 mb-lg-0" size="3x" />
                                            <div>
                                                <p className="fw-bold mb-1">Order</p>
                                                <p className="fw-bold mb-0">Shipped</p>
                                            </div>
                                        </div>
                                        <div className="d-lg-flex align-items-center">
                                            <MDBIcon fas icon="shipping-fast me-lg-4 mb-3 mb-lg-0" size="3x" />
                                            <div>
                                                <p className="fw-bold mb-1">Order</p>
                                                <p className="fw-bold mb-0">En Route</p>
                                            </div>
                                        </div>
                                        <div className="d-lg-flex align-items-center">
                                            <MDBIcon fas icon="home me-lg-4 mb-3 mb-lg-0" size="3x" />
                                            <div>
                                                <p className="fw-bold mb-1">Order</p>
                                                <p className="fw-bold mb-0">Arrived</p>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="mt-4 pt-2 mb-0">
                                        Want any help?{" "}
                                        <Link to="/contact" style={{ color: "#f37a27" }}>
                                            Please contact us
                                        </Link>
                                    </p>

                                </Box>
                            </Modal>
                        )}
                        {invoices.length ? (<TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            component="div"
                            count={invoices.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />) : (<div className="mb-3"> </div>)}

                    </Paper>
                </div>
            </Container>
        </>
    );
};

export default YourOrder;
