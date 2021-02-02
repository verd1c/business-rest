--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

-- Started on 2021-02-02 15:05:52

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 201 (class 1259 OID 16406)
-- Name: businesses; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.businesses (
    business_id integer NOT NULL,
    name character varying(40) NOT NULL,
    location character varying(40) NOT NULL,
    type character varying(20)
);


ALTER TABLE public.businesses OWNER TO me;

--
-- TOC entry 200 (class 1259 OID 16404)
-- Name: businesses_business_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.businesses_business_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.businesses_business_id_seq OWNER TO me;

--
-- TOC entry 2998 (class 0 OID 0)
-- Dependencies: 200
-- Name: businesses_business_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.businesses_business_id_seq OWNED BY public.businesses.business_id;


--
-- TOC entry 203 (class 1259 OID 16414)
-- Name: staff; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.staff (
    staff_id integer NOT NULL,
    business_id integer,
    email character varying(40) NOT NULL,
    first_name character varying(20) NOT NULL,
    last_name character varying(20) NOT NULL,
    "position" character varying(20) NOT NULL,
    phone_number character varying(40)
);


ALTER TABLE public.staff OWNER TO me;

--
-- TOC entry 202 (class 1259 OID 16412)
-- Name: staff_staff_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.staff_staff_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.staff_staff_id_seq OWNER TO me;

--
-- TOC entry 2999 (class 0 OID 0)
-- Dependencies: 202
-- Name: staff_staff_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.staff_staff_id_seq OWNED BY public.staff.staff_id;


--
-- TOC entry 2856 (class 2604 OID 16409)
-- Name: businesses business_id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.businesses ALTER COLUMN business_id SET DEFAULT nextval('public.businesses_business_id_seq'::regclass);


--
-- TOC entry 2857 (class 2604 OID 16417)
-- Name: staff staff_id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.staff ALTER COLUMN staff_id SET DEFAULT nextval('public.staff_staff_id_seq'::regclass);


--
-- TOC entry 2859 (class 2606 OID 16411)
-- Name: businesses businesses_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.businesses
    ADD CONSTRAINT businesses_pkey PRIMARY KEY (business_id);


--
-- TOC entry 2861 (class 2606 OID 16419)
-- Name: staff staff_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.staff
    ADD CONSTRAINT staff_pkey PRIMARY KEY (staff_id);


--
-- TOC entry 2862 (class 2606 OID 16420)
-- Name: staff fk_business; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.staff
    ADD CONSTRAINT fk_business FOREIGN KEY (business_id) REFERENCES public.businesses(business_id);


-- Completed on 2021-02-02 15:05:52

--
-- PostgreSQL database dump complete
--

