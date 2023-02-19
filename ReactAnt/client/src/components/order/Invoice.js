import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";
import Roboto from "../../fonts/Roboto-Italic.ttf";

const Invoice = ({ order }) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        ~ {new Date().toLocaleDateString()}~
      </Text>
      <Text style={styles.title}>Hóa đơn</Text>
      <Text style={styles.author}>Đơn hàng tại DStore</Text>
      <Text style={styles.subtitle}>Đơn hàng</Text>

      <Table>
        <TableHeader>
          <TableCell style={styles.TableHeader}>Tên sản phẩm</TableCell>
          <TableCell style={styles.TableHeader}>Giá</TableCell>
          <TableCell style={styles.TableHeader}>Số lượng</TableCell>
          <TableCell style={styles.TableHeader}>Thương hiệu</TableCell>
          <TableCell style={styles.TableHeader}>Màu sắc</TableCell>
        </TableHeader>
      </Table>
      <Table style={styles.table} data={order.products}>
        <TableBody>
          <DataTableCell getContent={(x) => x.product.title} />
          <DataTableCell getContent={(x) => `$${x.product.price}`} />
          <DataTableCell getContent={(x) => x.count} />
          <DataTableCell getContent={(x) => x.product.brand} />
          <DataTableCell getContent={(x) => x.product.color} />
        </TableBody>
      </Table>

      <Text style={styles.text}>
        <Text>
          Ngày: {"               "}
          {new Date(order.paymentIntent.created * 1000).toLocaleString()}
        </Text>
        {"\n"}
        <Text>
          Mã đơn hàng: {"         "}
          {order.paymentIntent.id}
        </Text>
        {"\n"}
        <Text>
          Trạng thái đơn hàng: {"  "}
          {order.orderStatus}
        </Text>
        {"\n"}
        <Text>
          Tổng tiền: {"       "}
          {order.paymentIntent.amount}
        </Text>
      </Text>

      <Text style={styles.footer}> ~ Cám ơn bạn đã mua hàng tại DStore ~ </Text>
    </Page>
  </Document>
);
Font.register({
  family: "Roboto",
  src: Roboto,
  fontWeight: 900,
});
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Roboto",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
    fontFamily: "Roboto",
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Roboto",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Roboto",
  },
  table: {
    fontFamily: "Roboto",
  },
  TableHeader: {
    fontFamily: "Roboto",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
    fontFamily: "Roboto",
  },
  footer: {
    padding: "100px",
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
    fontFamily: "Roboto",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});
export default Invoice;
