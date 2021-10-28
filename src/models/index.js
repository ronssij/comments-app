import { Model } from "vue-api-query";
import api from "@/services/api";

Model.$http = api;
