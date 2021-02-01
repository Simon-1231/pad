<template>
  <div>
    <top-nav></top-nav>
    <div class="postEditor">
      <top-title title="职位编辑">
        <button class="btn_save" @click="submitForm('form')">保存</button>
      </top-title>
      <el-form
        ref="form"
        :model="form"
        label-width="12rem"
        :rules="rules"
        @click.native="clickform"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="职位名称" prop="name">
              <el-input v-model="form.name" data-mode="cn"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职位类型" prop="keyword">
              <el-cascader v-model="form.keyword" :props="postProps" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="工作性质" prop="jobNature">
              <!-- <el-input v-model="form.jobNature" data-mode="cn"></el-input> -->
              <el-select v-model="form.jobNature">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in jobNatureList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学历要求" prop="education">
              <!-- <el-input v-model="form.education" data-mode="cn"></el-input> -->
              <el-select v-model="form.education">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in educationList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="薪资" prop="salaryBegin">
              <el-input v-model="form.salaryBegin" data-mode="cn"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <p>(k)</p>
          </el-col>
          <el-col :span="10">
            <el-form-item class="center" label="至" prop="salaryEnd">
              <el-input v-model="form.salaryEnd" data-mode="cn"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <p>(k)</p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="工作地点" prop="provinceCode">
              <el-cascader
                v-model="form.provinceCode"
                :props="props"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经验要求" prop="experience">
              <!-- <el-input v-model="form.experience" data-mode="cn"></el-input> -->
              <el-select v-model="form.experience">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in experienceList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item prop="address">
              <el-input v-model="form.address" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="address">
              <el-input v-model="form.address" disabled></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="具体地址" prop="address">
              <el-input v-model="form.address" data-mode="cn"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="年龄要求" prop="ageBegin">
              <el-input v-model="form.ageBegin" data-mode="cn"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <p>岁</p>
          </el-col>
          <el-col :span="7">
            <el-form-item class="center" label="至" prop="ageEnd">
              <el-input v-model="form.ageEnd" data-mode="cn"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <p>岁</p>
          </el-col>
          <el-col :span="7">
            <el-form-item label="招聘人数" prop="posts">
              <el-input v-model="form.posts" data-mode="cn"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <p>人</p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="职位简介" prop="description">
              <el-input
                v-model="form.description"
                type="textarea"
                data-mode="cn"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <vue-dusion-keyboard
      :float="true"
      bottom="20"
      class="my-keyboard"
    ></vue-dusion-keyboard>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import topNav from "@/components/TopNav";
import topTitle from "@/components/TopTitle";
import {
  updatePosition,
  getPositionType,
  findUserRegionByCode,
  auth
} from "@/api/ent";
export default {
  name: "postEditor",
  components: { topNav, topTitle },
  computed: {
    ...mapGetters(["postDetail"])
  },
  data() {
    return {
      form: {
        address: "",
        ageBegin: 0,
        ageEnd: 0,
        area: "",
        areaCode: 0,
        city: "",
        cityCode: 0,
        description: "",
        education: 0,
        experience: 0,
        id: 0,
        jobNature: "",
        keyword: 0,
        keywordThree: 0,
        keywordTwo: 0,
        latitude: "",
        longitude: "",
        name: "",
        posts: 0,
        province: "",
        provinceCode: 0,
        salaryBegin: 0,
        salaryEnd: 0,
        street: "",
        streetCode: 0
      },
      jobNatureList: [],
      educationList: [],
      experienceList: [],
      rules: {
        name: [{ required: true, message: "请输入职位名称", trigger: "blur" }],
        jobNature: [
          { required: true, message: "请输入工作性质", trigger: "blur" }
        ],
        education: [
          { required: true, message: "请输入学历要求", trigger: "blur" }
        ],
        experience: [
          { required: true, message: "请输入经验要求", trigger: "blur" }
        ],
        keyword: [
          { required: true, message: "请选择职位类型", trigger: "blur" }
        ],
        salaryBegin: [
          { required: true, message: "请输入最低薪资要求", trigger: "blur" }
        ],
        salaryEnd: [
          { required: true, message: "请输入最高薪资要求", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入具体地址", trigger: "blur" }
        ],
        ageBegin: [
          { required: true, message: "请输入最低年龄要求", trigger: "blur" }
        ],
        ageEnd: [
          { required: true, message: "请输入最高年龄要求", trigger: "blur" }
        ],
        posts: [{ required: true, message: "请输入招聘人数", trigger: "blur" }],
        description: [
          { required: true, message: "请输入招聘简介", trigger: "blur" }
        ]
      },
      postProps: {
        lazy: true,
        lazyLoad(node, resolve) {
          getPositionType(1, 99, node.value || "").then(res => {
            let nodes = [];
            if (res.code === 0 && res.data) {
              nodes = res.data.list.map(post => ({
                label: post.msg,
                value: post.code,
                leaf: node.level > 1
              }));
            }
            resolve(nodes);
          });
        }
      },
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          findUserRegionByCode(node.value || 100000).then(res => {
            let nodes = [];
            if (res.code === 0 && res.data) {
              nodes = res.data.map(area => ({
                label: area.name,
                value: area.id,
                leaf: area.level > 2
              }));
            }
            resolve(nodes);
          });
        }
        // checkStrictly: true
      }
    };
  },
  created() {
    this._init(); // 回显
    this._getauth("jobNature", this.jobNatureList); // 获取字典
    this._getauth("education", this.educationList);
    this._getauth("experience", this.experienceList);
  },
  methods: {
    // 解决虚拟键盘第一次打开位置不对的bug
    clickform(e) {
      const str = e.target.nodeName.toLowerCase();
      if (str === "input" || str === "textarea") {
        e.target.blur();
        e.target.focus();
      }
    },
    _getauth(type, list) {
      auth({ type })
        .then(res => {
          if (res.code === 0) {
            res.data.forEach(i => {
              list.push({ label: i.msg, value: i.code });
            });
          }
        })
        .catch(err => console.log(err));
    },
    _init() {
      this.form = Object.assign(this.form, this.postDetail);
      this.arr = [];
      const areaArr = [];
      if (this.postDetail.keyword) this.arr.push(this.postDetail.keyword);
      if (this.postDetail.keywordTwo) this.arr.push(this.postDetail.keywordTwo);
      if (this.postDetail.keywordThree)
        this.arr.push(this.postDetail.keywordThree);
      if (this.postDetail.provinceCode)
        areaArr.push(this.postDetail.provinceCode);
      if (this.postDetail.cityCode) areaArr.push(this.postDetail.cityCode);
      if (this.postDetail.areaCode) areaArr.push(this.postDetail.areaCode);
      this.form.keyword = this.arr;
      this.form.provinceCode = areaArr;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          const { keyword, provinceCode } = this.form;
          this.form.keyword = keyword[0];
          this.form.keywordTwo = keyword[1];
          this.form.keywordThree = keyword[2];
          this.form.provinceCode = provinceCode[0];
          this.form.cityCode = provinceCode[1];
          this.form.areaCode = provinceCode[2];
          updatePosition(this.form)
            .then(res => {
              if (res && res.code === 0) {
                this.$message.success("保存成功！");
                this.$router.go(-1);
              } else {
                this.$message.success("保存失败，请联系管理员");
              }
            })
            .catch(err => {
              console.log(err);
              this.$message.success("保存失败，请联系管理员");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "~@/common/css/keyboard";
.postEditor {
  padding: 2rem;
  .center,
  .el-form .el-form-item__label {
    text-align: center;
  }
  .btn_save {
    width: 10rem;
    height: 4rem;
    background: linear-gradient(
      -90deg,
      rgba(1, 207, 254, 1),
      rgba(0, 132, 255, 1)
    );
    border-radius: 3rem;
    font-size: 2rem;
    color: rgba(255, 254, 254, 1);
    border: none;
    margin: 0 1rem;
    position: absolute;
    right: 2rem;
  }
  .el-form {
    margin-top: 1rem;
    font-size: 2rem;
    .el-input,
    .el-input--medium .el-input__inner {
      height: 5rem;
    }
    .el-form-item__label,
    p {
      font-size: 2rem;
      font-weight: 600;
      height: 5rem;
      line-height: 5rem;
    }
    .el-input__inner,
    .el-textarea__inner {
      font-size: 1.5rem;
      font-weight: 600;
      height: 10rem;
      border: 1px solid rgba(143, 143, 143, 1);
    }
  }
  .el-cascader,
  .el-select {
    width: 100%;
  }
}
</style>
